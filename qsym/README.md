## QSYM

https://hub.docker.com/r/zjuchenyuan/qsym

Source: https://github.com/sslab-gatech/qsym

Modification: do not check `/proc/sys/kernel/yama/ptrace_scope` in `setup.py` and `setup.sh`.

```
Current Version: aabec86
More Versions: Ubuntu 16.04, gcc 5.4, PIN 2.14 (modified), Python 2.7.12, AFL 2.52b
Last Update: 2019/08
Language: Python, C
Type: Concolic Execution, PIN-based, Binary Instrumentation, Hybrid Fuzzing (with AFL)
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration

Please refer to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl). 

### Step2: Compile target programs

```
mkdir -p $WORKDIR/example/build/mp3gain/normal/
mkdir -p $WORKDIR/example/build/mp3gain/afl/{justafl,aflasan}

# build the aflasan binary, here aflasan means AFL-instrumented binary with AddressSanitizer
cd $WORKDIR/example/code/mp3gain1.6.2
docker run --rm -w /work -it -v `pwd`:/work --privileged --env AFL_USE_ASAN=1 zjuchenyuan/afl sh -c "make clean; make"
mv mp3gain $WORKDIR/example/build/mp3gain/afl/aflasan/

# build the normal binary, qsym itself do not need compile-time instrumentation
cd $WORKDIR/example/code/mp3gain1.6.2
docker run --rm -w /work -it -v `pwd`:/work --privileged --env CC=gcc --env CXX=g++ zjuchenyuan/afl sh -c "make clean; make"
mv mp3gain $WORKDIR/example/build/mp3gain/normal/
```

### Step3: Start Fuzzing

```
cd $WORKDIR/example
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/qsym scripts/runqsym_mp3gain.sh
```

Here [scripts/runqsym_mp3gain.sh](https://github.com/zjuchenyuan/dockerized_fuzzing/blob/master/example/scripts/runqsym_mp3gain.sh) start two AFL instances (master and slave) and then wait for `afl-slave/fuzzer_stats` to be created, then start qsym.

### Explanation

`--privileged` is required for PIN to work, so it's mandatory.

Steps above is what we do in UNIFUZZ experiments, just as [QSYM README](https://github.com/sslab-gatech/qsym) `Run hybrid fuzzing with AFL`.

In our UNIFUZZ experiments, to provide a fair comparison between different fuzzers, we limit each fuzzer to 1 CPU. So here two AFL instances and 1 QSYM instance will compete for CPU.

The crash result are cumulated from two places: afl-master/crashes, afl-slave/crashes, while queue files are cumulated from three places including qsym/queue.

When fuzzing large programs, you may need to modify the timeout setting in QSYM source code [qsym/afl.py](https://github.com/sslab-gatech/qsym/blob/master/qsym/afl.py) `DEFAULT_TIMEOUT = 90` to a bigger value.
