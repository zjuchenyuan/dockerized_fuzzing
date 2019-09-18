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

### Step1: System configuration & Step2: Compile target programs

Since QSYM is incorporated on AFL, these steps are mostly equal to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl) Step 1 and 2. 
The difference is we need to build with Address Sanitizer as stated by [QSYM README](https://github.com/sslab-gatech/qsym) `Run hybrid fuzzing with AFL`.

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space

wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

# build asan binary
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; AFL_USE_ASAN=1 make; mv mp3gain mp3gain_asan"

# build normal binary
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; CC=gcc CXX=g++ make; mv mp3gain mp3gain_normal"

svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step3: Start Fuzzing

Here, we assume `mp3gain_asan` and `mp3gain_normal` binaries and mp3 seed files `seed_mp3` are present in current folder.

```
wget https://raw.githubusercontent.com/UNIFUZZ/dockerized_fuzzing_examples/master/scripts/runqsym_mp3gain.sh
chmod +x ./runqsym_mp3gain.sh

mkdir -p output/qsym
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/qsym ./runqsym_mp3gain.sh
```

Here [runqsym_mp3gain.sh](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/blob/master/scripts/runqsym_mp3gain.sh) start two AFL instances (master and slave) and then wait for `afl-slave/fuzzer_stats` to be created, then start qsym.

### Explanation

`--privileged` is required for PIN to work, so it's mandatory.

Steps above is what we do in UNIFUZZ experiments, just as [QSYM README](https://github.com/sslab-gatech/qsym) `Run hybrid fuzzing with AFL`.

In our UNIFUZZ experiments, to provide a fair comparison between different fuzzers, we limit each fuzzer to 1 CPU. So here two AFL instances and 1 QSYM instance will compete for CPU.

The crash result are cumulated from two places: afl-master/crashes, afl-slave/crashes, while queue files are cumulated from three places including qsym/queue.

When fuzzing large programs, you may need to modify the timeout setting in QSYM source code [qsym/afl.py](https://github.com/sslab-gatech/qsym/blob/master/qsym/afl.py) `DEFAULT_TIMEOUT = 90` to a bigger value.
