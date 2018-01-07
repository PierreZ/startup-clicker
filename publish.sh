#!/bin/sh

set -e;

# if [[ $(git status -s) ]]
# then
#     echo "The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi

echo "Deleting old publication"
rm -rf dist
git clone git@github.com:PierreZ/startup-clicker.git --branch gh-pages dist
rm -rf dist/*
npm run build
cd dist 

sed -i -e "s/static/startup-clicker\/static/g" index.html
sed -i -e "s/static\/img/startup-clicker\/static\/img/g" static/js/*

echo "pushing..."
git add --all && git commit -m "(./publish.sh) updating gh-pages" && git push origin gh-pages && cd ..
echo "done"