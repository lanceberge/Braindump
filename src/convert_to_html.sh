#!/bin/bash

ORG_FILES=("src/routes/braindump/explanation.org")
ORG_DIRECTORIES=()

convert_file() {
    local file="$1"
    local dir=$(dirname "$file")
    local filename=$(basename "$file" .org)

    echo "converting file: $file"
    pandoc -f org -t html -o "$dir/$filename.html" "$file"
}

# Process specified directories
for dir in "$ORG_DIRECTORIES"; do
    if [[ -d "$dir" ]]; then
        echo "Processing directory: $dir"
        find "$dir" -type f -name "*.org" | while read -r file; do
            convert_file "$file"
        done
    fi
done

for file in "$ORG_FILES"; do
    convert_file "$file"
done
