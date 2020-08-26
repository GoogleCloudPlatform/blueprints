#!/bin/bash
set -eu

for file in `ls examples`; do
    file_name="${file%.*}"
    file_extension="${file##*.}"
    js_file=${file_name}.js

    if [ "$file_extension" != "txt" ]
    then
      echo "skip ${file}"
      continue
    fi

    dst_path=web/client/src/config/examples/${js_file}
    echo "sync ${file} to ${dst_path}"

    # delete current example
    rm -f ${dst_path}

    # create new example
    touch ${dst_path}
    echo -n 'const code = `' >> ${dst_path}
    cat examples/${file} >> ${dst_path}
    echo '`' >> ${dst_path}
    echo 'export default code;' >> ${dst_path}
done
