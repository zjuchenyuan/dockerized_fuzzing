## AFLPIN

https://hub.docker.com/r/zjuchenyuan/aflpin

Source: https://github.com/mothran/aflpin

```
Version: 3668e1e
More Versions: PIN 2.13, AFL 1.15b, gcc 4.8
Last Update: 2015/01
Type: Binary Instrumentation
Tag: Intel PIN
```

## Guidance

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
docker run --privileged -w /work -it -v `pwd`:/work --env AFL_NO_FORKSRV=1 zjuchenyuan/aflpin /bin/bash
# it seems afl-1.15b cannot get correct terminal size, so run this command in container
afl-fuzz -i seed_mp3 -o output/aflpin -m 500 -- \
    /pinplay-1.2-pin-2.13-62732-gcc.4.4.7-linux/intel64/bin/pinbin -ifeellucky -t /aflpin/obj-intel64/aflpin.so -- \
        ./mp3gain @@
```

## Deprecated Warning

According to https://github.com/mothran/aflpin/issues/1 , the author thought QEMU mode of AFL is much faster.

> It has been a long time since I worked on this because QEMU mode for AFL is shockingly faster (https://github.com/mirrorer/afl/tree/master/qemu_mode).
