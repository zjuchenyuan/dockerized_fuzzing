## jsfuzz

https://hub.docker.com/r/zjuchenyuan/jsfuzz

Source: https://github.com/fuzzitdev/jsfuzz

```
Current Version: 1.0.14
More Versions: nodejs 12.14.1
Last Update: 2020/01 Active
Language: JavaScript (TypeScript)
Type: Coverage-based fuzzer
Note: libfuzzer-like entry code needed
```

## Guidance

This docker image has installed [jpeg-js@0.3.6](https://www.npmjs.com/package/jpeg-js/v/0.3.6), to fuzz it:

```
docker run -it zjuchenyuan/jsfuzz /jsfuzz/build/src/index.js /jsfuzz/examples/jpeg/fuzz.js
```

The corresponding fuzzing entry code is [here](https://github.com/fuzzitdev/jsfuzz/blob/master/examples/jpeg/fuzz.js).