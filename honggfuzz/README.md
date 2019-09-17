## honggfuzz

https://hub.docker.com/r/zjuchenyuan/honggfuzz

Source: https://github.com/google/honggfuzz

```
Current Version: 1.9
More Versions: clang 6.0
Last Update: 2019/09 Active
Language: C
Type: Mutation Fuzzer, Compile-time Instrumentation
Tag: multi-process, multi-threaded, support libfuzzer-like persistent fuzzing mode
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration

Please refer to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl). 

### Step2: Compile target programs

```
mkdir -p $WORKDIR/example/build/mp3gain/honggfuzz/

cd $WORKDIR/example/code/mp3gain1.6.2
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/honggfuzz sh -c "make clean; make"
mv mp3gain $WORKDIR/example/build/mp3gain/honggfuzz/
```

### Step3: Start Fuzzing

```
cd $WORKDIR/example
mkdir -p output/honggfuzz/queue
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/honggfuzz \
    /honggfuzz/honggfuzz -f seed/mp3 -W output/honggfuzz/output --covdir_all output/honggfuzz/queue --threads 1 -- /work/build/mp3gain/honggfuzz/mp3gain ___FILE___
```

### Explanation

#### honggfuzz parameters

More Usage: https://github.com/google/honggfuzz/blob/master/docs/USAGE.md

- `-f seed/mp3`: input seed folder
- `-W output/honggfuzz/output`: output folder, store crashes & runtime files
- `--covdir_all output/honggfuzz/queue`: queue folder
- `--threads 1`: only run 1 instance, instead of number of CPUs/2
- `__FILE__`: equivalent to @@ in AFL command line

