#!/usr/bin/env sh

git fetch github
git checkout master
git reset --hard github/master
git branch -d step8
