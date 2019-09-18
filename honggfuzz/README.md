## honggfuzz

https://hub.docker.com/r/zjuchenyuan/honggfuzz

Source: https://github.com/google/honggfuzz

```
Current Version: 1.9
More Versions: clang 6.0
Last Update: 2019/09 Active
Language: C
Type: Mutation Fuzzer, Compile-time Instrumentation
Tag: multi-process, multi-threaded, support libfuzzer-like persistent fuzzing mode
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration

Run these commands as root or sudoer, if you have not or rebooted:

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first # tfuzz require this
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space # vuzzer require this
```

Error message like `No such file or directory` is fine, and you can just ignore it.

### Step2: Compile target programs

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/honggfuzz sh -c "make clean; make"

# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step3: Start Fuzzing

```
mkdir -p output/honggfuzz/queue
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/honggfuzz \
    /honggfuzz/honggfuzz -f seed_mp3 -W output/honggfuzz/output \
        --covdir_all output/honggfuzz/queue --threads 1 -- \
        ./mp3gain ___FILE___
```

### Explanation

#### honggfuzz parameters

More Usage: https://github.com/google/honggfuzz/blob/master/docs/USAGE.md

- `-f seed/mp3`: input seed folder
- `-W output/honggfuzz/output`: output folder, store crashes & runtime files
- `--covdir_all output/honggfuzz/queue`: queue folder
- `--threads 1`: only run 1 instance, instead of number of CPUs/2
- `__FILE__`: equivalent to @@ in AFL command line

