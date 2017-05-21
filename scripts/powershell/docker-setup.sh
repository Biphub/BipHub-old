#!/usr/bin/env bash
echo "docker machine starting default"
docker-machine start
echo "Setting COMPOSE_CONVERT_WINDOWS_PATH that converts win path to linux path. Required for volume share"
$env:COMPOSE_CONVERT_WINDOWS_PATHS=1
echo "Attempting to link default docker-machine to Powershell"
docker-machine env --shell powershell default | Invoke-Expression
echo "Run eslint"
docker exec -it 2427b21ec6ff yarn js:lint
#NOTE:
# When you are getting permission denied from docker-compose up, make sure you have deleted node_modules folder