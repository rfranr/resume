#!/bin/bash
rm -rf ./static 
mkdir ./static
touch ./static/.gitignore
echo "*" > ./static/.gitignore

pandoc '.\resume.md' -f markdown -t html -s -o static/resume.html

current_dir=`pwd -P`

#enter in a untracked dir 
cd ./static

git clone -b docs --single-branch https://github.com/rfranr/resume.git

cp resume.html ./resume/resume.html

#enter in a copy of branch docs
cd resume

git status

git add -A
git commit -m "deploy"

git push

# goto working dir
cd $current_dir

rm -rf ./static
