#!/usr/bin/env sh

cd ~/workspace/ashley
rm -rf rest-api-swagger
git clone https://github.com/CiscoDevNet/rest-api-swagger.git

git checkout -b step8 step8

docker stop restaurants
docker rm restaurants
