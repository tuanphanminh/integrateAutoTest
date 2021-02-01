#!/bin/sh

EXIT_CODE_1=0

set -e

docker rm docker-training -f || true

docker pull minhnhut86/automation-support-training:latest

docker run --name="docker-training" minhnhut86/automation-support-training:latest /bin/bash -c "mvn -f guardian/ clean verify -PTest -Dis.browser.headless=true -Dsuite.testng.file=setting/testng/web/dashboard/kyc/create_lead_and_deal_testng.xml " || EXIT_CODE_1=$?

docker rm docker-training

export EXIT_CODE_1

echo $EXIT_CODE_1 > btnShell1.out
