## eclipser

https://hub.docker.com/r/zjuchenyuan/eclipser

Source: https://github.com/SoftSec-KAIST/Eclipser

This image is based on [jchoi2022/eclipser-artifact:v0.1](https://hub.docker.com/r/jchoi2022/eclipser-artifact), and may not keep with latest code.

```
Version: v1.0
Last Update: 2019/07
Language: C#
Type: Concolic Testing
```

## Guidance

Welcome to the world of fuzzing! 
In this tutorial, we will experience a simple realistic fuzzing towards [MP3Gain](http://mp3gain.sourceforge.net/) 1.6.2.

### Step1: System configuration

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
```

Error message like `No such file or directory` is fine, and you can just ignore it.

Note: 

Although not all configuration are required by this fuzzer, we provide these command in a uniform manner for consistency between different fuzzers. 

These commands may impair your system security (turning off ASLR), but not a big problem since fuzzing experiments are normally conducted in dedicated machines.

Instead of `echo core > /proc/sys/kernel/core_pattern` given by many fuzzers which still generate a core dump file when crash happens, 
here we disable core dump file generation to reduce I/O pressure during fuzzing. [Ref](http://man7.org/linux/man-pages/man5/core.5.html).

### Step2: Compile target programs

Download the source code, compile using normal `gcc`.

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip
# build using afl-gcc
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; CC=gcc CXX=g++ make"
```

### Step3: Prepare Seed Files

[UNIFUZZ](https://github.com/UNIFUZZ/seeds) provides seed files with various types. Here we provides 10 mp3 seed files, to be downloaded to `seed_mp3` folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Fuzzing!

Fuzz with verbose level 1, stop fuzzing after 600 seconds (not precisely), provide command line by --initarg and specify filename to --fixfilepath

```
mkdir output/eclipser
docker run --privileged -w /work/output/eclipser -it -v `pwd`:/work zjuchenyuan/eclipser \
    dotnet /home/artifact/Eclipser/build/Eclipser.dll fuzz -v 1 -p /work/mp3gain \
        -t 600 -o /work/output/eclipser --src file --initarg "foo" -i /work/seed_mp3  --fixfilepath "foo" 
```

## Paper

ICSE 2019: Grey-box Concolic Testing on Binary Code [PDF](https://softsec.kaist.ac.kr/~jschoi/data/icse2019.pdf)
