## fairfuzz

https://hub.docker.com/r/zjuchenyuan/fairfuzz

Source: https://github.com/carolemieux/afl-rb

```
Current Version: 2.52b
More Versions: Ubuntu 16.04, gcc 5.4, clang 3.8
Last Update: 2017/11
Language: C
Type: Mutation Fuzzer, Compile-time Instrumentation, AFL-based
Tag: targeting rare branches, ASE 2018
```

## Guidance

### Step1: System configuration & Step2: Compile target programs

Please refer to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl). 

### Step3: Start Fuzzing

cd $WORKDIR/example
docker run -it --rm -w /work -v `pwd`:/work --privileged  zjuchenyuan/fairfuzz \
    afl-fuzz -i seed/mp3 -o output/fairfuzz -- /work/build/mp3gain/afl/justafl/mp3gain @@

### More Usage

See https://github.com/carolemieux/afl-rb