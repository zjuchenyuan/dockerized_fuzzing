## T-Fuzz

https://hub.docker.com/r/zjuchenyuan/tfuzz

Source: https://github.com/HexHive/T-Fuzz

Modification:

- Do not build QEMU for afl, as T-Fuzz will not use it, and build QEMU for certain architecture seems to be broken
- fix Deprecation Warning issue, see https://github.com/HexHive/T-Fuzz/issues/12 , but I use latest version of shellphish/fuzzer
- fix create_dict.py for python2

```
Current Version: 7d150e4
More Versions: Ubuntu 16.04, Python 2.7.12, angr 7.8.2.21, shellphish/fuzzer 04c3b51, AFL 2.52b
Last Update: 2018/12
Language: Python
Type: AFL-based
Tag: program transformation
```

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration & Step2: Compile target programs

Since T-Fuzz is based on AFL, these steps are equal to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl) Step 1 and 2. 

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
# build using afl-gcc
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; make"

svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step3: Start Fuzzing

Here we assume you have built mp3gain using AFL compiler in current folder and downloaded mp3 seed files.

```
mkdir -p output/tfuzz
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/tfuzz \
    /T-Fuzz/TFuzz --program ./mp3gain --work_dir output/tfuzz --seed_dir seed_mp3 --target_opts @@
```

## Possible issues

### https://github.com/HexHive/T-Fuzz/issues/14

It's not appropriate for directly using T-Fuzz to fuzz `infotocap`, as T-Fuzz will change the ELF name which impacts program behavior.

This is considered and fixed in UNIFUZZ experiments, but this Docker image do not fix it.

### https://github.com/HexHive/T-Fuzz/issues/16

For big binaries, T-Fuzz will generate too many transformed binaries, causing huge I/O pressure and consuming large disk spaces.

When we conduct UNIFUZZ experiments, we think it may be not appropriate for us to change related code. 

Which generating threshold should we take? Will this change hugely impact T-Fuzz performance?

### https://github.com/HexHive/T-Fuzz/issues/18

T-Fuzz may be using wrong code to filter usable seeds, treating all non-zero return code as crashing seed.

When it finds no seeds left, it will generate a random seed for AFL to use instead of using provided seed sets, without giving any warning.

This issue is not addressed in UNIFUZZ experiments since we found this issue after the experiments.


## Notes

If you want to build QEMU mode for AFL, please refer to https://hub.docker.com/r/zjuchenyuan/driller/dockerfile .

If you need run QEMU mode in T-Fuzz, you can change [tfuzz/tfuzz_sys.py](https://github.com/HexHive/T-Fuzz/blob/master/tfuzz/tfuzz_sys.py) `afl_opts`, adding a `-Q` parameter.

This image installed wrong same-name package `tracer`. Although T-Fuzz stated it require it, but it just import it and do not use it.

To correctly install tracer provided by angr, `pip install -U git+https://github.com/angr/tracer`.