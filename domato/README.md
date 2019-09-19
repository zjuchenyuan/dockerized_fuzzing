## domato

https://hub.docker.com/r/zjuchenyuan/domato

Source: https://github.com/googleprojectzero/domato

```
Current Version: d610b78
More Versions: Ubuntu 16.04, Python 3.5.2
Last Update: 2019/03
Language: Python
Type: Generator
File Formats: HTML (including CSS, JS, SVG)
```

## Guidance

This will generate three html files:

```
docker run -it --rm -v `pwd`/output/domato:/output zjuchenyuan/domato \
    python3 generator.py --output_dir /output --no_of_files 3
```

You can view output files [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/domato).