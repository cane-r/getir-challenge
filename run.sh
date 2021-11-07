#!/usr/bin/env bash
#or run the below command from cmd to set the correct shebang
#echo $(which bash) | xargs -r -I path sed -i --expression "s@/usr/bin/bash@path@" run.sh && ./run.sh
#not including node and npm installation lines.
#this file can be adapted to a .bat file also,if you use windows.
git clone https://github.com/cane-r/getir-challenge.git;
cd getir-challenge;
npm i;
#to run tests,execute npm run test ,or npm test
#to run in dev env,execute npm run dev
#run with prod env in aws
npm run prod;
