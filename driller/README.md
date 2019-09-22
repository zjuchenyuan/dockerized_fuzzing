## Driller

https://hub.docker.com/r/zjuchenyuan/driller

Source: https://github.com/shellphish/driller

Modification: 

- Only build QEMU for x86_64 and i386, since certain architecture seems to be broken
- Script `shellphuzz` is modified to support `--target-opts` and `--extra-opts`
- Patch for correctly check `core_pattern`

```
Version: 5ab7367
More Versions: QEMU 2.10.0, AFL 2.52b, shellphish/fuzzer 04c3b51, angr/tracer 7e9f18e, Python 3.5.2
Last Update: 2019/04
Type: AFL-based, Binary Instrumentation, Symbolic Execution
```

## Guidance

Welcome to the world of fuzzing! 
In this tutorial, we will experience a simple realistic fuzzing towards [MP3Gain](http://mp3gain.sourceforge.net/) 1.6.2.

### Step1: System configuration

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
# caution: unpatched shellphish/fuzzer will not work in this setting, see below
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

**Specifically, we patched `fuzzer.py` of shellphish/fuzzer, to use correct method to check core_pattern.**


### Step2: Compile target programs

Driller will use QEMU mode to fuzz target program, so we need to compile target program **without** AFL instrumentation.

Download the source code, compile using normal `gcc`.


```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip
# build using gcc
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

```
docker run  -w /work -it -v `pwd`:/work zjuchenyuan/driller \
    shellphuzz -c 1 -d 1 -w output/driller -s seed_mp3 --target-opts @@ ./mp3gain
```
