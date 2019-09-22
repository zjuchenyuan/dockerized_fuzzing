## MoonLight

https://hub.docker.com/r/zjuchenyuan/moonlight

Source: https://gitlab.anu.edu.au/lunar/moonlight

**This is not a fuzzer.**

```
Type: Fuzzing Tool > Seed Distillation
Last Update: 2019/02
```

## Usage

To use MoonLight, you need to provide **coverage data of each run**, in BitVector format, the index of each bit corresponds to a specific basic
block in the target application. [Learn More](https://gitlab.anu.edu.au/lunar/moonlight/blob/master/DATA.md).

MoonLight is somewhat like `afl-cmin`, but only the selection part.

This image has included a running towards png data provided by the author, you can view the result:

```
docker run -it --rm zjuchenyuan/moonlight cat /moonlight/data/png/png1_solution.json
```

The outputed file are collected [here].

For more usage: https://gitlab.anu.edu.au/lunar/moonlight/blob/master/USAGE.md

