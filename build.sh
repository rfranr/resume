#!/bin/bash
rm -rf ./static 
mkdir ./static
touch ./static/.gitignore
echo * > ./static/.gitignore

pandoc '.\resume.md' -f markdown -t html -s -o static/resume.html

git add -A
git commit -m "deploy"


git add -A

git status

git commit -m "deploy"
git checkout main

git rm -rf static/

git add -A

git status

git commit -m "deploy"

git push 

