## AFL

https://hub.docker.com/r/zjuchenyuan/afl

> Current Version: 2.52b
Last Update: 2017/11
Language: C
Special dependencies: QEMU may be needed (not included in this image)
Type: Mutation Fuzzer, need compile

## Guidance

Welcome to the world of fuzzing, in this tutorial, we will experience a simple realistic fuzzing towards [MP3Gain](http://mp3gain.sourceforge.net/) 1.6.2.

### Step1: System configuration

Run these commands as root:

```
echo core >/proc/sys/kernel/core_pattern
echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0|sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1|sudo tee /proc/sys/kernel/sched_child_runs_first # tfuzz require this
echo 0|sudo tee /proc/sys/kernel/randomize_va_space # vuzzer require this
```

### Step2: Compile target programs

Since AFL need compilation-time instrumentation, we need to build target program using `afl-gcc`.

```
git clone https://github.com/zjuchenyuan/dockerized_fuzzing
cd dockerized_fuzzing
export WORKDIR=`pwd`
mkdir -p $WORKDIR/example/build/mp3gain/normal/
mkdir -p $WORKDIR/example/build/mp3gain/afl/{justafl,aflasan}

# build the justafl binary
docker pull zjuchenyuan/afl
cd $WORKDIR/example/code/mp3gain1.6.2
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl sh -c "make clean; make"
mv mp3gain $WORKDIR/example/build/mp3gain/afl/justafl/
```

`zjuchenyuan/afl` image has already set environment `CC` and `CXX`, so you just need to `make`.

### Step3: Start Fuzzing

First, rename the `output` folder provided by me to provide a clean folder:

```
cd $WORKDIR/example
mv output output.bak
mkdir output
```

Then, you can start fuzzing:

```
cd $WORKDIR/example
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl afl-fuzz -i seed/mp3 -o output/afl -- /work/build/mp3gain/afl/justafl/mp3gain @@
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