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

Welcome to the world of fuzzing, in this tutorial, we will experience a simple realistic fuzzing towards [MP3Gain](http://mp3gain.sourceforge.net/) 1.6.2.

### Step1: System configuration

Run these commands as root or sudoer, if you have not or rebooted:

```
echo core | sudo tee /proc/sys/kernel/core_pattern
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0|sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1|sudo tee /proc/sys/kernel/sched_child_runs_first # tfuzz require this
echo 0|sudo tee /proc/sys/kernel/randomize_va_space # vuzzer require this
```

Error message like `No such file or directory` is fine, and you can just ignore it.

### Step2: Compile target programs

Since AFL need compilation-time instrumentation, we need to build target program using `afl-gcc`.

Here, I set environment variable `WORKDIR` for easier navigation across different folders.

```
git clone https://github.com/zjuchenyuan/dockerized_fuzzing
cd dockerized_fuzzing
export WORKDIR=`pwd` # attention: back quote
mkdir -p $WORKDIR/example/build/mp3gain/normal/
mkdir -p $WORKDIR/example/build/mp3gain/afl/{justafl,aflasan}

# build the justafl binary, justafl means AFL-instrumented binary, without ASAN.
docker pull zjuchenyuan/afl
cd $WORKDIR/example/code/mp3gain1.6.2
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl sh -c "make clean; make"
mv mp3gain $WORKDIR/example/build/mp3gain/afl/justafl/
```

`zjuchenyuan/afl` image has already set environment `CC` and `CXX`, so you just need to `make`. If you want to build with clang, refer to last section.

If you just cloned the repository, rename the `output` folder provided by me to provide a clean folder:

```
cd $WORKDIR/example
mv output output.bak
mkdir output
```

### Step3: Start Fuzzing

```
cd $WORKDIR/example
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    afl-fuzz -i seed/mp3 -o output/afl -- /work/build/mp3gain/afl/justafl/mp3gain @@
```

### Explaination

#### Docker run usage

docker run [some params] <image name> program [program params]

#### Docker Parameters

- `--rm`: delete the container after the container finished. If you are doing realistic fuzzing experiments, you should omit this.
- `-w /work`: set the working folder of the container, so we can omit `cd /work`.
- `-it`: interactive, like a terminal; if you want to run the container in the background, use `-d`
- `-v `pwd`:/work`: set the directory mapping, so the output files will be directly wrote to host folder.
- `--privileged`: this may not be required, but to make things easier. Without this, you cannot do preparation step in the container.

#### AFL Parameters

- `-i`: seed folder, here I provided 10 mp3 seed files in [seed/mp3](https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/example/seed/mp3)
- `-o`: output folder, where crash files and queue files will be stored.
- `-m`: `-m 1024` to set memory limit as 1GB
- `-t`: `-t 100+` to set time limit as 100ms, skip those seed files which leads to timeout
- `--`: which means which after it is the target program and its command line
- `@@`: place holder for mutated file

#### Output Example

See [example/output/afl](https://github.com/zjuchenyuan/dockerized_fuzzing/tree/master/example/output/afl)

### Use Clang Compiler

If you want to build program using `clang`, AFL provided llvm_mode. You can set environment variable `CC` and `CXX` to `/afl/afl-clang-fast` and `/afl/afl-clang-fast++` respectively.

For example, instead of just `make`, you can `CC=/afl/afl-clang-fast CXX=/afl/afl-clang-fast++ make`. In some cases, you may need to manually change Makefile to change CC and CXX.

This image use clang-3.8.