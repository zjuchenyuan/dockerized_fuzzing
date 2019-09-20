## ptfuzzer

https://hub.docker.com/r/zjuchenyuan/ptfuzzer

Source: https://github.com/hunter-ht-2018/ptfuzzer

**!!!Caution!!! Running this fuzzer may be dangerous, it made our server unresponsive and we had to manually hard-reboot**

Requirements:

- Linux kernel >= 4.13.0, recommend 4.13 or 4.14
- Intel CPU i5/6/7-x000, x >= 5

```
Current Version: 631b522
Last Update: 2019/07
Language: C, Python
Type: AFL-based, Binary Instrumentation
Tag: Intel PT
```

## Guidance

### Check whether your CPU support PT

```
cat /sys/bus/event_source/devices/intel_pt/type
```

`no such file` means no support for PT, and you cannot run this fuzzer.

### Preparation

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

# build using gcc
docker run --rm -w /work -it -v `pwd`:/work zjuchenyuan/afl sh -c "make clean; CC=gcc CXX=g++ make"

# download seed files
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Fuzzing!

```
mkdir -p output/ptfuzzer
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/ptfuzzer \
    python /ptfuzzer/build/bin/ptfuzzer.py "-i seed_mp3 -o output/ptfuzzer" "./mp3gain"
```

## Paper

IEEE Access > Volume: 6 PTfuzz: Guided Fuzzing With Processor Trace Feedback [IEEE Document](https://ieeexplore.ieee.org/document/8399803)