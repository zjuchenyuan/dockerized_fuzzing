#!/usr/bin/python3
import requests
import json
import glob
import sys
import os
from secret import headers, cookies

data = {"registry":"registry-1.docker.io","full_description":"x"}

oldtime = os.path.getmtime(".git/index")
for filepath in [i for i in sorted(glob.glob("*/README.md"), key=lambda f:os.path.getmtime(f), reverse=True) if os.path.getmtime(i)>oldtime]+sys.argv[1:]:
    name = filepath.split("/")[0]
    if name == "example":
        continue
    data["full_description"] = open(name+"/README.md", encoding="utf-8").read()
    response = requests.patch('https://cloud.docker.com/v2/repositories/zjuchenyuan/'+name+'/', headers=headers, cookies=cookies, data=json.dumps(data))
    try:
        print(response.json()["name"])
    except:
        print("Error:", filepath)