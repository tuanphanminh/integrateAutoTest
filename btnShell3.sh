#!/bin/sh

EXIT_CODE_3=0

set -e

#docker rm docker-training -f

EXIT_CODE_3=1

export EXIT_CODE_3

echo $EXIT_CODE_3 > btnShell3.out
