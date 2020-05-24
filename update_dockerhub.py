#!/usr/bin/python3
"""
this script is used to update README on DockerHub
To use this, manually login to DockerHub, and trigger a README update request, 
then copy cURL request (in Chrome DevTools) to https://curl.trillworks.com/ to get headers and cookies
"""
import requests
import json
import glob
import sys
import os
from secret import headers, cookies

data = {"registry":"registry-1.docker.io","full_description":"x"}

oldtime = os.path.getmtime(".git/index")
if len(sys.argv)==2 and sys.argv[1]=="all":
    filepaths = [i for i in sorted(glob.glob("*/README.md"), key=lambda f:os.path.getmtime(f), reverse=True)]
else:
    filepaths = [i for i in sorted(glob.glob("*/README.md"), key=lambda f:os.path.getmtime(f), reverse=True) if os.path.getmtime(i)>oldtime]+sys.argv[1:]
for filepath in filepaths:
    name = filepath.split("/")[0]
    if name == "example":
        continue
    data["full_description"] = open(name+"/README.md", encoding="utf-8").read()
    response = requests.patch('https://hub.docker.com/v2/repositories/zjuchenyuan/'+name+'/', headers=headers, cookies=cookies, data=json.dumps(data))
    try:
        print(response.json())
    except:
        print("Error:", filepath)

