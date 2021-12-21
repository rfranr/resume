#!/bin/bash
git rm -rf resume.html
pandoc '.\resume.md' -f markdown -t html -s -o resume.html
git checkout docs
git rm -rf resume.html
git checkout main -- resume.html
git add resume.html
git commit -m "deploy"
git push
git checkout main
git rm -rf resume.html

