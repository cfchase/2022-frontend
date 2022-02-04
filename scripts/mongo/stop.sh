#!/usr/bin/env bash
printf "\n\n######## mongo db container run in background ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# Need to change into this dir since docker-compose searches cwd for yaml
cd $DIR

PODMAN_COMPOSE=$(which podman-compose 2>&1 >/dev/null)
DOCKER_COMPOSE=$(which docker-compose 2>&1 >/dev/null)

if [[ -z "$PODMAN_COMPOSE" ]]; then
  podman-compose down
  podman ps
elif [[ -z "$DOCKER_COMPOSE" ]]; then
  docker-compose down
  docker ps
else
    echo Error: could not find docker-compose or podman-compose
fi
