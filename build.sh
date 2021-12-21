#!/bin/bash
rm -rf ./static 
mkdir ./static
touch ./static/.gitignore
echo "*" > ./static/.gitignore

pandoc '.\resume.md' -f markdown -t html -s -o static/resume.html


cd ./static

git clone -b docs --single-branch https://github.com/rfranr/resume.git

cp resume.html ./resume/resume.html

cd resume

git status

git add -A
git commit -m "deploy"

git push

cd ../..

rm -rf ./static