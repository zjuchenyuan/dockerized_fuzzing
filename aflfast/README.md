## AFLFast

https://hub.docker.com/r/zjuchenyuan/aflfast

Source: https://github.com/mboehme/aflfast

```
Current Version: 2.51b
More Versions: Ubuntu 16.04, gcc 5.4, clang 3.8
Last Update: 2018/10
Language: C
Special dependencies: QEMU may be needed (not included in this image)
Type: Mutation Fuzzer, Compile-time Instrumentation, AFL-based
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration & Step2: Compile target programs

Please refer to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl). 

### Step3: Start Fuzzing

```
cd $WORKDIR/example
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/aflfast \
    afl-fuzz -p fast -i seed/mp3 -o output/aflfast -- /work/build/mp3gain/afl/justafl/mp3gain @@
```

### Explanation

Almost the same as AFL, adding a parameter `-p fast`.

You can choice `-p fast`, `-p coe`, `-p explore`, `-p quad`, `-p lin`, `-p exploit`. For details, refer to https://github.com/mboehme/aflfast .

