#!/usr/bin/env sh

echo "Removing rest-api-swagger directory"
cd ~/workspace/ashley
rm -rf rest-api-swagger

echo "Cloning project"
git clone https://github.com/CiscoDevNet/rest-api-swagger.git

echo "Checkout step8"
cd ~/workspace/ashley/rest-api-swagger
git checkout -b step8 step8

echo "Cleanup docker images"
docker stop restaurants
docker rm restaurants
