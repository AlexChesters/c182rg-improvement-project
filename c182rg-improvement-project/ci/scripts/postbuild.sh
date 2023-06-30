set -e

./MSFSLayoutGenerator.exe build/layout.json

if [ -z $GITHUB_ACTIONS ]; then
    rm -rf "C:/Users/alexc/AppData/Roaming/Microsoft Flight Simulator/Packages/Community/c182rg-improvement-project"
    cp -R "build" "C:/Users/alexc/AppData/Roaming/Microsoft Flight Simulator/Packages/Community/c182rg-improvement-project"
fi