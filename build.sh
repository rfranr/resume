#!/bin/bash
mkdir static

git add resume.md
git commit -m "deploy"
pandoc '.\resume.md' -f markdown -t html -s -o static/resume.html

git add static/resume.html
git commit -m "deploy"

git checkout docs

git checkout main static/resume.html

git add -A

git status

git commit -m "deploy"
git checkout main

git rm -rf static/

git add -A

git status

git commit -m "deploy"

git push 

