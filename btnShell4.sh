#!/bin/sh

EXIT_CODE_4=0

set -e

#docker rm docker-training -f

EXIT_CODE_4=-1

export EXIT_CODE_4

echo $EXIT_CODE_4 > btnShell4.out