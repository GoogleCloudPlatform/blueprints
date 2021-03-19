#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ORG_ID=$1

# recursively deletes a folder and its subfolders
recursive_delete_folder() {
    folder_id=$1
    folder_name=$2
    echo "Attempting to delete folder ${folder_name} with id ${folder_id}"
    echo "Checking for subfolders in ${folder_name}"
    subfolders=$(gcloud alpha resource-manager folders list --folder=${folder_id} --format="value[terminator=;](displayName,name)" --quiet --verbosity="error")
    if [ "$subfolders" ]; then
            IFS=';' read -rd '' -a subfolders_arr <<<"$subfolders"
            unset subfolders_arr[${#subfolders_arr[@]}-1]
            for folder in "${subfolders_arr[@]}";do
                folder_arr=($folder)
                echo "Found subfolder: ${folder_arr[1]} ${folder_arr[0]}"
                recursive_delete_folder ${folder_arr[1]} ${folder_arr[0]}
            done
        else
            echo "No subfolders found for ${folder_name}"
            delete=$(gcloud alpha resource-manager folders delete ${folder_id})
            if [[  $? -eq 1 ]]; then
                echo "Unable to delete folder ${folder_name} with id ${folder_id}"
            else
                echo "Folder ${folder_name} with id ${folder_id} deleted"
            fi
    fi
}

# TODO(bbaiju): investigate unique display names for hierarchy blueprint testing
# previous test runs may leave conflicting test folder resources if tests are interrupted before git repo is reset.
# this attempts to clean up any top level folders before a new test is setup
cleanupTLF=(dev qa prod shared)
for displayName in ${cleanupTLF[@]}; do
found=$(gcloud alpha resource-manager folders list --organization=$ORG_ID --filter="displayName=${displayName}" --format="value(displayName,name)" --quiet --verbosity="error")
if [ "$found" ]; then
    found_arr=($found)
    recursive_delete_folder ${found_arr[1]} ${found_arr[0]}
fi
done
