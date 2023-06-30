set -e

./fspackagetool.exe ./c182rg-improvement-project-ingamepanels.xml -nopause
cp -R html_ui/InGamePanels dist/html_ui/InGamePanels
cp -R html_ui/icons dist/html_ui/icons
cp -R InGamePanels dist/InGamePanels
cp -R Packages/c182rg-improvement-project-ingamepanels/Build/c182rg-improvement-project-ingamepanels.spb dist/InGamePanels/c182rg-improvement-project-ingamepanels.spb