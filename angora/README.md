## Angora

https://hub.docker.com/r/zjuchenyuan/angora

Source: https://github.com/AngoraFuzzer/Angora

```
Current Version: 1.2.2
More Versions: Ubuntu 16.04, LLVM 7.0.0, Rust 1.37.0, PIN 3.7, golang 1.6.2
Last Update: 2019/09 Active
Language: Rust, C++ (DataFlow Sanitizer)
Type: Mutation Fuzzer, Compile-time Instrumentation
Tags: Context-sensitive branch coverage, Byte-level taint tracking (modified DFSan), Search based on gradient descent, Type and shape inference, Input length exploration
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration

Run these commands as root or sudoer, if you have not or rebooted:

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
# caution: older version Angora may not work under this setting, see below notes
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

**Specifically, older version (prior than 20190919) Angora need `echo core | sudo tee /proc/sys/kernel/core_pattern`, see this [commit](https://github.com/AngoraFuzzer/Angora/commit/e343f04c55e0998a646ed0442273f7c0c80fe034) for patching.**

### Step2: Compile target programs

We need to compile two times, fast version and taint version, placing in `./fast/mp3gain` and `./taint/mp3gain` respectively. 

Taint version does data flow tracing to figure out which input bytes are related to certain conditional branch, thus needs more time for compiling, while fast version is used for fuzzing.

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

mkdir -p {fast,taint}

# build angora fast and taint binaries
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/angora sh -c "make clean; make"
mv mp3gain fast/

docker run --rm -w /work -it -v `pwd`:/work --privileged --env USE_TRACK=1 --env ANGORA_TAINT_RULE_LIST=/tmp/abilist.txt zjuchenyuan/angora sh -c "make clean; /angora/tools/gen_library_abilist.sh  /usr/lib/x86_64-linux-gnu/libmpg123.so discard > /tmp/abilist.txt; make"
mv mp3gain taint/
```

### Step3: Prepare Seed Files

[UNIFUZZ](https://github.com/UNIFUZZ/seeds) provides seed files with various types. Here we provides 10 mp3 seed files, to be downloaded to `seed_mp3` folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Fuzzing!

Here, we assume `fast/mp3gain` and `taint/mp3gain` binaries are present, as well as seed files folder `seed_mp3`.

```
mkdir -p output
rm -rf output/angora
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/angora \
    /angora/angora_fuzzer --input seed_mp3 --output output/angora \
        -t ./taint/mp3gain -- \
        ./fast/mp3gain @@
```

### Explanation

#### ABI list for build tainted binary

DataFlow Sanitizer needs all code to be present, or provide an ABI list to tell how to propagate the tags for unknown functions.

Angora provides us `/angora/tools/gen_library_abilist.sh` to generate needed ABI list file, and we need to specify the file location via environment variable `ANGORA_TAINT_RULE_LIST`.

For more details, see https://github.com/AngoraFuzzer/Angora/blob/master/docs/build_target.md Model an external library.

#### Input Length

In [common/src/config.rs](https://github.com/AngoraFuzzer/Angora/blob/a3b25de4b1d68584d3027c0a0aa3da93bb571959/common/src/config.rs)

```
pub const MAX_INPUT_LEN: usize = 15000;
```

Angora only accept seed files less than 15000 bytes, so we changed `MAX_INPUT_LEN` in UNIFUZZ experiments to make fuzzers use same seed sets for a fair comparison.

## Paper

S&P 2018: Angora: Efficient Fuzzing by Principled Search [PDF](https://web.cs.ucdavis.edu/~hchen/paper/chen2018angora.pdf)
