#!/usr/bin/env python3
import os
import json

keyName = lambda d: d['name']

def traverse(basedir):
    files = []
    for name in os.listdir(basedir):
        path = basedir + "/" + name
        if os.path.isdir(path):
            files.append({'name': name, 'children': traverse(path)})
        else:
            name = name.rsplit(".", 1)[0]
            files.append({'name': name, 'path': path})
    return sorted(files, key=keyName)

def main():
    BASEDIR = 'docs'
    index_data = {
        'version': 1, 
        'body': {
            'name': 'index',
            # 'path': '',
            'children': traverse(BASEDIR),
        },
    }
    with open('index.json', 'w', encoding='utf-8') as fout:
        json.dump(index_data, fout, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()