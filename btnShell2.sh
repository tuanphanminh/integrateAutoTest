#!/bin/sh
EXIT_CODE_2=0

set -e

#docker rm docker-training -f
#docker run --name="docker-training" minhnhut86/automation-support-training:latest /bin/bash -c "mvn -f guardian/ clean verify -PTest -Dis.browser.headless=true -Dsuite.testng.file=setting/testng/web/dashboard/kyc/create_lead_and_deal_testng.xml " || EXIT_CODE_1=$?

EXIT_CODE_2=1

export EXIT_CODE_2

echo $EXIT_CODE_2 > btnShell2.out