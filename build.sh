#!/bin/bash
pandoc '.\resume.md' -f markdown -t html -s -o resume.html
git checkout docs
git rm -rf resume.html
git checkout main -- resume.html
git commit -m "deploy"
git checkout main
git rm -rf resume.html

