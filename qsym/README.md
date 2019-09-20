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

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
```

### Step2: Compile target programs

We need to build with Address Sanitizer as stated by [QSYM README](https://github.com/sslab-gatech/qsym) `Run hybrid fuzzing with AFL`.

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

# build asan binary
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; AFL_USE_ASAN=1 make; mv mp3gain mp3gain_asan"

# build normal binary
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; CC=gcc CXX=g++ make; mv mp3gain mp3gain_normal"
```

### Step3: Preparing Seed Files

[UNIFUZZ](https://github.com/UNIFUZZ/seeds) provides seed files with various types. Here we provides 10 mp3 seed files, to be downloaded to `seed_mp3` folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Fuzzing!

Here, we assume `mp3gain_asan` and `mp3gain_normal` binaries and mp3 seed files `seed_mp3` are present in current folder.

```
wget https://raw.githubusercontent.com/UNIFUZZ/dockerized_fuzzing_examples/master/scripts/runqsym_mp3gain.sh
chmod +x ./runqsym_mp3gain.sh

mkdir -p output/qsym
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/qsym ./runqsym_mp3gain.sh
```

Here [runqsym_mp3gain.sh](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/blob/master/scripts/runqsym_mp3gain.sh) start two AFL instances (master and slave) and then wait for `afl-slave/fuzzer_stats` to be created, then start qsym.

In your own fuzzing experiments, you will modify this script to accommodate your binary name, seed folder path, output path, and command line.

### Explanation

`--privileged` is required for [PIN](https://software.intel.com/en-us/articles/pin-a-dynamic-binary-instrumentation-tool) to work, so it's mandatory.

Steps above is what we do in UNIFUZZ experiments, just as [QSYM README](https://github.com/sslab-gatech/qsym) `Run hybrid fuzzing with AFL`.

In our UNIFUZZ experiments, to provide a fair comparison between different fuzzers, we limit each fuzzer to 1 CPU. So here two AFL instances and 1 QSYM instance will compete for CPU.

The crash result are cumulated from two places: afl-master/crashes, afl-slave/crashes, while queue files are cumulated from three places including qsym/queue.

When fuzzing large programs, you may need to modify the timeout setting in QSYM source code [qsym/afl.py](https://github.com/sslab-gatech/qsym/blob/master/qsym/afl.py) `DEFAULT_TIMEOUT = 90` to a bigger value.

## Paper

USENIX 2018: Qsym : A Practical Concolic Execution Engine Tailored for Hybrid Fuzzing [PDF](https://www.usenix.org/system/files/conference/usenixsecurity18/sec18-yun.pdf)