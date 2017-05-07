#!/usr/bin/env bash
echo "docker machine starting default"
docker-machine start
echo "Setting COMPOSE_CONVERT_WINDOWS_PATH that converts win path to linux path. Required for volume share"
$env:COMPOSE_CONVERT_WINDOWS_PATHS=1
echo "Attempting to link default docker-machine to Powershell"
docker-machine env --shell powershell default | Invoke-Expression