
wt -p "Command Prompt" -d ./src cmd /k "tsc -w"; split-pane -p "Command Prompt" -d ./ cmd /k "http-server"; split-pane -p "Command Prompt" -d ./ cmd /k "npm run watch"
