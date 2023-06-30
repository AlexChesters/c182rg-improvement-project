set -e

./MSFSLayoutGenerator.exe dist/layout.json

if [ -z $GITHUB_ACTIONS ]; then
    rm -rf "C:/Users/alexc/AppData/Roaming/Microsoft Flight Simulator/Packages/Community/c182rg-improvement-project"
    cp -R "dist" "C:/Users/alexc/AppData/Roaming/Microsoft Flight Simulator/Packages/Community/c182rg-improvement-project"
fi