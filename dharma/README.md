## dharma

https://hub.docker.com/r/zjuchenyuan/dharma

Source: https://github.com/MozillaSecurity/dharma

```
Current Version: 1.2.0
More Versions: Ubuntu 16.04, Python 3.5.2
Last Update: 2019/07
Language: Python
Type: Generator
File Formats: JS(canvas), JSON, SVG, URL, XSS
```

## Guidance

```
# generate three js files:
docker run -it --rm -v `pwd`/output/dharma:/output zjuchenyuan/dharma \
    dharma -grammars dharma/grammars/canvas2d.dg -storage /output -count 3 -format js

# generate one 1000-line json file
docker run -it --rm -v `pwd`/output/dharma:/output zjuchenyuan/dharma \
    sh -c "dharma -grammars dharma/grammars/json.dg -count 1000 > /output/output.json"
```

You can view output files [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/dharma).