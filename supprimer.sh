#!/bin/bash

# Script to delete all empty files in the current directory and its subdirectories

echo "Searching for empty files..."
find . -type f -empty -print

echo -n "Do you want to delete these files? (y/n): "
read answer

if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    find . -type f -empty -delete
    echo "All empty files have been deleted."
else
    echo "Operation cancelled."
fi