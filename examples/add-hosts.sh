#!/bin/bash

set -e

if [[ $(id -u) -ne 0 ]] ; then
  echo -e "\e[31;1mError\e[0;31m: Requires root permissions.\e[0m" 1>&2
  exit 1
fi

path="$1"
name=$(basename $path)
hostspath="$path/.hosts"

echo -n "Configure hosts for $name ... "
if [ -f "$path/.hosts" ] ; then
    basehost=$(cat "$path/.hosts" | awk '{print $2}')
    if grep -q "$basehost" /etc/hosts ; then
        echo "skipped (/etc/hosts already includes '$basehost'. Please remove all '$basehost' entries from /etc/hosts first)"
    else
        cat "$path/.hosts" >> /etc/hosts
        echo "done (.hosts entries added to /etc/hosts)"
    fi
else
    echo "skipped (.hosts has no entries or doesn't exist at all)"
fi
