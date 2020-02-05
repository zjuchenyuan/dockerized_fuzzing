## jsfunfuzz

https://hub.docker.com/r/zjuchenyuan/jsfunfuzz

Source: https://github.com/MozillaSecurity/funfuzz

```
Version: 0.7.0a1
More Versions: gecko-dev 65dc081, python 3.7.6
Language: Python, JavaScript
Type: Generation
```

Dockerfile: [https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/jsfunfuzz](https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/jsfunfuzz)

## Usage

```
docker run -it -v `pwd`/output:/data -w /data zjuchenyuan/jsfunfuzz \
    python -m funfuzz.js.loop --random-flags 20 mozilla-central /gecko-dev/js/src/build_OPT.OBJ/dist/bin/js
```

`--random-flags`: Pass a random set of flags (e.g. --ion-eager) to the js engine

`argv[1] 20`: timeout seconds, kill js shell if it runs this long.

`argv[2] mozilla-central`: not used, should be removed

`argv[3]`: js binary path

## Note

js.fuzzmanagerconf requires `product`, `platform`, `os`, however these settings are not documented,
I don't know whether [my settings](https://github.com/zjuchenyuan/dockerized_fuzzing/blob/master/jsfunfuzz/js.fuzzmanagerconf) are correct.

In official repo, its README says:

> Some parts of the harness assume a clean Mercurial clone of the mozilla trees.

This image only have a `git clone --depth 1` code folder, so some features like binary search may not be supported.

## TODO

There are text displaying during the fuzzing process, I haven't figure out which process output this, and is this warning important?

```
warning: no passes specified, not doing any work
```

