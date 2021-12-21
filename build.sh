#!/bin/bash
mkdir static
pandoc '.\resume.md' -f markdown -t html -s -o static/resume.html
git checkout docs
git add -A
git commit -m "deploy"
git push
git checkout main
rm -rf static/
