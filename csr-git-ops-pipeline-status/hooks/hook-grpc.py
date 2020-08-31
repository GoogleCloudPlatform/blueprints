# Needed for pyinstaller to work w/ grpc
# Ref: https://github.com/googleapis/google-cloud-python/issues/5774#issuecomment-480509426
from PyInstaller.utils.hooks import collect_data_files
datas = collect_data_files('grpc')
