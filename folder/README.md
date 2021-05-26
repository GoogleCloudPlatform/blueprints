# Google folder, project blueprint
This blueprint creates a folder and a project in it

## Replace the following in Kptfile:
- ${FOLDER_NAME}
- ${PROJECT_ID}
- ${FOLDER_ID} is the parent folder to create a folder under, requires quotes otherwise apply command will fail to parse as string
- ${BILLING_ACCOUNT_ID}

## Create the following IAM role binding 
${FOLDER_ID} can be in a different organization. Bind the following IAM roles to
service-[PROJECT_NUMBER]@gcp-sa-[PREVIEW_PRODUCT].iam.gserviceaccount.com:
- Folder Creator
- Folder Editor 
- Project Creator
- Project Deleter

Bind `Billing Account User` IAM role to service-[PROJECT_NUMBER]@gcp-sa-[PREVIEW_PRODUCT].iam.gserviceaccount.com