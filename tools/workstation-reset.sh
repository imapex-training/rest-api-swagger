#!/usr/bin/env sh

git fetch origin
git checkout master
git reset --hard origin/master
git branch -d step8

docker stop restaurants
docker rm restaurants
