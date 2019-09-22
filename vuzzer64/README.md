## Vuzzer64

https://hub.docker.com/r/zjuchenyuan/vuzzer64

Source: https://github.com/vusec/vuzzer64

Modifications:

- Fix BB-weight-angr.py for using higher version angr
- Fix issue [#11](https://github.com/vusec/vuzzer64/issues/11), [#12](https://github.com/vusec/vuzzer64/issues/12), [#14](https://github.com/vusec/vuzzer64/issues/14)
- Modify `GENNUM` to 1000000, a bigger value than 1000, to make Vuzzer64 run longer

For image `zjuchenyuan/vuzzer64:201902`, we also fix issue [#10](https://github.com/vusec/vuzzer64/issues/10), this issue is fixed in latest version.

```
Version: 05583b6
More Versions: PIN 3.7, angr 8.19.7.25, networkx 1.11
Last Update: 2019/09
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

### Step4: Static Analysis

In this guidance, we will use [angr script]() to generate required .pkl and .names files, 
you can also finish this step by using Ghidra or IDA. See: https://github.com/vusec/vuzzer64/blob/master/wikiHOWTO.md

```
docker run --privileged --rm -w /work -it -v `pwd`:/work -v /dev/shm/vutemp:/vuzzer64/fuzzer-code/vutemp zjuchenyuan/vuzzer64 /bin/bash
# now, we are in the container
python3 /angr-static-analysis-for-vuzzer64/BB-weight-angr.py ./mp3gain

# covert pickle files to version 2, for python2 to use
python3 -c "import pickle; open('mp3gain.py2.pkl','wb').write(pickle.dumps(pickle.load(open('mp3gain.pkl', 'rb')), 2))"
python3 -c "import pickle; x=pickle.load(open('mp3gain.names', 'rb')); open('mp3gain.py2.names','wb').write(pickle.dumps((set([i.encode() for i in x[0]]), set([i.encode() for i in x[1]])), 2))"
```

If you are using IDA under Windows to generate these two files, you may need `dos2unix *.pkl` and `dos2unix *.names`.

### Step5: Fuzzing

Still in the container. Notice Vuzzer require `%s`, instead of @@.

```
cd /vuzzer64/fuzzer-code
python runfuzzer.py -s '/work/mp3gain %s' -i /work/seed_mp3 -w /work/mp3gain.py2.pkl -n /work/mp3gain.py2.names 
# you may need Ctrl+Z to stop the fuzzing, or just killall python
# the output files are located at /vuzzer64/fuzzer-code/outd
```

## Paper

NDSS 2017: VUzzer: Application-aware Evolutionary Fuzzing [PDF](https://www.cs.vu.nl/~giuffrida/papers/vuzzer-ndss-2017.pdf)