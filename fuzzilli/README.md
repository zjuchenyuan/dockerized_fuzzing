## fuzzilli

https://hub.docker.com/r/zjuchenyuan/fuzzilli

Source: https://github.com/googleprojectzero/fuzzilli

```
Current Version: git badd02e 2019/11/08
More Versions: gecko-dev 65dc081, swift 5.1.4
Language: Swift
Type: Coverage-based fuzzer
```

Dockerfile: [https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/fuzzilli](https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/fuzzilli)

This image only contain spidermonkey (firefox js engine). `zjuchenyuan/fuzzilli:spidermonkey`

TODO: add image for v8 and webkit.

## Usage

```
sysctl -w 'kernel.core_pattern=|/bin/false'
docker run -it -w `pwd`/output:/data zjuchenyuan/fuzzilli:spidermonkey /fuzzilli/.build/debug/FuzzilliCli --storagePath=/data --exportState --profile=spidermonkey /gecko-dev/js/src/fuzzbuild_OPT.OBJ/dist/bin/js
```

## Note

Currently, directly use https://github.com/googleprojectzero/fuzzilli/blob/master/Targets/Spidermonkey/firefox.patch to patch will fail 1 hunk, so I use [this file](https://github.com/zjuchenyuan/dockerized_fuzzing/blob/master/fuzzilli/firefox_65dc081_20200131.patch) to patch.

Besides, due to this [issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1588340), this [patch](https://github.com/zjuchenyuan/dockerized_fuzzing/blob/master/fuzzilli/mozbuild.patch) proposed by Anthony Ramine is also used.