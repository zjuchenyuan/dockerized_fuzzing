## AFL

https://hub.docker.com/r/zjuchenyuan/afl

Source: https://github.com/mirrorer/afl

```
Current Version: 2.52b
More Versions: Ubuntu 16.04, gcc 5.4, clang 3.8
Last Update: 2017/11
Language: C
Special dependencies: QEMU may be needed (not included in this image)
Type: Mutation Fuzzer, Compile-time Instrumentation
```

## Guidance

Welcome to the world of fuzzing! 
In this tutorial, we will experience a simple realistic fuzzing towards [MP3Gain](http://mp3gain.sourceforge.net/) 1.6.2.

### Step1: System configuration

Run these commands as root or sudoer, if you have not or rebooted:

```
echo "" | sudo tee /proc/sys/kernel/core_pattern # disable generating of core dump file
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first # tfuzz require this
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space # vuzzer require this
```

Error message like `No such file or directory` is fine, and you can just ignore it.

Note: 

Although not all configuration are required by this fuzzer, we provide these command in a uniform manner for consistency between different fuzzers. 

These commands may impair your system security (turning off ASLR), but not a big problem since fuzzing experiments are normally conducted in dedicated machines.

Instead of `echo core > /proc/sys/kernel/core_pattern` given by many fuzzers which still generate a core dump file when crash happens, 
here we disable core dump file generation to reduce I/O pressure during fuzzing. [Ref](http://man7.org/linux/man-pages/man5/core.5.html).

### Step2: Compile target programs and Prepare seed files

Since AFL uses compilation-time instrumentation, we need to build target program using `afl-gcc` or `afl-clang`.

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

# build using afl-gcc
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; make"
```

`zjuchenyuan/afl` image has already set environment `CC` and `CXX`, so you just need to `make`, it's equivalent to `CC=/afl/afl-gcc CXX=/afl/afl-g++ make`.

If you want to build with clang, refer to last section.

### Step3: Prepare seed files

If you have not prepared mp3 seed files for fuzzing, you can use what we have provided [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/seed/mp3). More seed types? Take a look at [UNIFUZZ seeds repo](https://github.com/UNIFUZZ/seeds).

`apt install -y subversion` may be needed if `svn: command not found`.

```
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Fuzzing!

```
mkdir -p output/afl
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    afl-fuzz -i seed_mp3 -o output/afl -m 2048 -t 100+ -- ./mp3gain @@
```

### Explanation

#### Docker run usage

docker run [some params] <image name> program [program params]

#### Docker Parameters

- `-w /work`: set the working folder of the container, so we can omit `cd /work`.
- `-it`: interactive, like a terminal; if you want to run the container in the background, use `-d`
- `-v `pwd`:/work`: set the directory mapping, so the output files will be directly wrote to host folder.
- `--privileged`: this may not be required, but to make things easier. Without this, you cannot do preparation step in the container.

#### AFL Parameters

- `-i`: seed folder
- `-o`: output folder, where crash files and queue files will be stored
- `-m`: `-m 2048` to set memory limit as 2GB
- `-t`: `-t 100+` to set time limit as 100ms, skip those seed files which leads to timeout
- `--`: which means which after it is the target program and its command line
- `@@`: place holder for mutated file

#### Output Example

See [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/afl)

### Using Clang Compiler

If you want to build program using `clang`, AFL provided llvm_mode. You can set environment variable `CC` and `CXX` to `/afl/afl-clang-fast` and `/afl/afl-clang-fast++` respectively.

For example, instead of just `make`, you can `CC=/afl/afl-clang-fast CXX=/afl/afl-clang-fast++ make`. In some cases, you may need to manually change Makefile to change CC and CXX.

This image use clang-3.8.

### Using ASAN

Building with `AFL_USE_ASAN=1`, and running with `-m none` and longer timeout. Example:

```
# build ASAN binary, you will see "[+] Instrumented x locations (64-bit, ASAN/MSAN mode, ratio 33%)."
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; AFL_USE_ASAN=1 make"

# run fuzzing
mkdir -p output/aflasan
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    afl-fuzz -i seed_mp3 -o output/aflasan -m none -t 500+ -- ./mp3gain @@
```

### Target programs need specific file name?

AFL will always use `.cur_input` as the mutated file name, if your targeted program need specific suffix type for filename, you need to modify [afl-fuzz.c](https://github.com/mirrorer/afl/blob/master/afl-fuzz.c).

Here is an example using `x.mp3` to replace `.cur_input`:

```
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl /bin/bash
# in the container
cd /afl
sed -i 's/.cur_input/x.mp3/g' afl-fuzz.c
make clean
CC=gcc CXX=g++ make && make install

# now you can use your customized afl-fuzz to run fuzzing
```

## Official Documentation

http://lcamtuf.coredump.cx/afl/

https://github.com/mirrorer/afl/tree/master/docs
