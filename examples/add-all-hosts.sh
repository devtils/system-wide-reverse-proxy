#!/bin/bash

set -e

if [[ $(id -u) -ne 0 ]] ; then
  echo -e "\e[31;1mError\e[0;31m: Requires root permissions.\e[0m" 1>&2
  exit 1
fi

find -maxdepth 1 -type d -not \( -name '.' -or -name '..' \) | sort | while read file
do
  ./add-hosts.sh $file
done
