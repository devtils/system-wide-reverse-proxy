#!/bin/bash

# exec latest version of this file:
#   ENV=development # or production
#   curl -s https://raw.githubusercontent.com/devtils/system-wide-reverse-proxy/master/setup.sh | bash

set -e

env=${ENV:-development}

eggsit () {
  local exitCode=${1:-0}
  if [ $exitCode -ne 0 ] ; then
    local msg="$2"
    echo -e "\e[31;1mError:\e[0;31m $msg.\e[0m" 2>&1
  fi
  exit $exitCode
}

mainDir=${DIR:-system-wide-reverse-proxy}
if [ ! -d $mainDir ] ; then
  mkdir -f $mainDir
  if [ $? -ne 0 ] ; then
    eggsit 1 "Couldn't create '$mainDir/'. Wrong permissions?"
  fi
fi
cd $mainDir
if [ $? -ne 0 ] ; then
  eggsit 1 "Couldn't enter '$mainDir/'. Wrong permissions?"
fi

which docker
if [ $? -ne 0 ] ; then
  eggsit 1 "Docker does not seem to be installed."
fi

dockerNetwork="${NET:-traefik}"
docker network inspect $dockerNetwork 2>&1 1>/dev/null
if [ $? -ne 0 ] ; then
  docker network create --attachable $dockerNetwork 2>&1 1>/dev/null
  if [ $? -ne 0 ] ; then
    eggsit 1 "Couldnt create docker network '$dockerNetwork'. User not in docker group?"
  fi
fi

curl -s https://raw.githubusercontent.com/devtils/system-wide-reverse-proxy/master/docker-compose.$env.yml > docker-compose.yml
if [ $? -ne 0 ] || [ ! -f docker-compose.yml ] ; then
  eggsit 1 "Latest version of 'docker-compose.$env.yml' couldn't be downloaded or installed into '$dirName'. Wrong environment or permissions?"
fi

# TODO: check if somthing blocks :80/:443

echo -e "\e[32mEverything is setup.\n\n\e[0mNext steps:\n  1. configure traefik: edit $(pwd)/docker-compose.yml\n  2. start traefik:\n     cd $(pwd)\n     docker-compose up -d\n"
