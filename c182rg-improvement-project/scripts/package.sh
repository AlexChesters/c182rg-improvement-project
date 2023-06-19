set -euo pipefail

# pushd build
# zip -r ../c182rg-improvement-project.zip *
# popd

Compress-Archive -Path build -DestinationPath c182rg-improvement-project.zip
