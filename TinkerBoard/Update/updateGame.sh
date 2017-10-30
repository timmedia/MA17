#! /bin/bash

echo "Removing current version"

sudo rm -r MA17

echo "Files removed, cloning repository"

git clone https://github.com/timmedia/MA17.github

echo "Done"
