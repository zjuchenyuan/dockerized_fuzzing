## T-Fuzz

https://hub.docker.com/r/zjuchenyuan/tfuzz

Source: https://github.com/HexHive/T-Fuzz

Modifications: (take a look at [Dockerfile](https://hub.docker.com/r/zjuchenyuan/tfuzz/dockerfile).)

- Do not build QEMU for afl, as T-Fuzz will not use it, and build QEMU for certain architecture seems to be broken
- Fix Deprecation Warning issue, see https://github.com/HexHive/T-Fuzz/issues/12 , but we use latest version of shellphish/fuzzer
- Fix create_dict.py for python2
- Patch for [issue #14](https://github.com/HexHive/T-Fuzz/issues/14)
- Patch for correctly check `core_pattern`

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

Since T-Fuzz is based on AFL, this step is equal to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl).

Download the source code, compile using `afl-gcc`.

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip
# build using afl-gcc
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/afl \
    sh -c "make clean; make"
```

### Step3: Prepare Seed Files

[UNIFUZZ](https://github.com/UNIFUZZ/seeds) provides seed files with various types. Here we provides 10 mp3 seed files, to be downloaded to `seed_mp3` folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Fuzzing!

Here we assume you have built mp3gain binary using AFL compiler in current folder and downloaded mp3 seed files.

```
mkdir -p output/tfuzz
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/tfuzz \
    /T-Fuzz/TFuzz --program ./mp3gain --work_dir output/tfuzz --seed_dir seed_mp3 --target_opts @@
```

## Possible issues

### https://github.com/HexHive/T-Fuzz/issues/14

It's not appropriate for directly using T-Fuzz to fuzz `infotocap`, as T-Fuzz will change the ELF name which impacts program behavior.

This is considered and fixed in UNIFUZZ experiments, and this Docker image also fixed it.

### https://github.com/HexHive/T-Fuzz/issues/16

For big binaries, T-Fuzz will generate too many transformed binaries, causing huge I/O pressure and consuming large disk spaces.

When we conduct UNIFUZZ experiments, we think it may be not appropriate for us to change related code. 

Which generating threshold should we take? Will this change hugely impact T-Fuzz performance?

### https://github.com/HexHive/T-Fuzz/issues/18

T-Fuzz may be using wrong code to filter usable seeds, treating all non-zero return code as crashing seed.

For example, in the demo fuzzing setup above, only [eight](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/tfuzz/fuzzing_mp3gain_tfuzz/mp3gain_tfuzz/input) are used by AFL, [two seeds](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/tfuzz/fuzzing_mp3gain_tfuzz/mp3gain_tfuzz/crashing_seeds) are treated as crashing seeds.

When it finds no seeds left, it will generate a random seed for AFL to use, without giving any warning of discarding user-provided seeds.

This issue is not addressed in UNIFUZZ experiments since we found this issue after the experiments. 
And this may be treated as a feature of T-Fuzz, so we have not patched it in this image.

## Notes

If you want to build QEMU mode for AFL, please refer to https://hub.docker.com/r/zjuchenyuan/driller/dockerfile .

If you need run QEMU mode in T-Fuzz, you can change [tfuzz/tfuzz_sys.py](https://github.com/HexHive/T-Fuzz/blob/master/tfuzz/tfuzz_sys.py) `afl_opts`, adding a `-Q` parameter.

This image installed wrong same-name package `tracer`. Although T-Fuzz stated it require it, but it just import it and do not use it.

To correctly install tracer provided by angr, `pip install -U git+https://github.com/angr/tracer`.

## Paper

S&P 2018: T-Fuzz: fuzzing by program transformation [PDF](https://nebelwelt.net/publications/files/18Oakland.pdf)