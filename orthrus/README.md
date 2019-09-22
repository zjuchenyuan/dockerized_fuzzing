## Orthrus

https://hub.docker.com/r/zjuchenyuan/orthrus

Source: https://github.com/test-pipeline/orthrus

```
Version: 1.2
More Versions: LLVM 3.8
Last Update: 2017/04
Type: Fuzzing Tool, AFL-included, AFLFast-included
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


### Step2: Prepare target program source code

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

# orthrus will do the compile job, but it need configure file present
touch configure && chmod +x configure
```

### Step3: Prepare Seed Files

[UNIFUZZ](https://github.com/UNIFUZZ/seeds) provides seed files with various types. Here we provides 10 mp3 seed files, to be downloaded to `seed_mp3` folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

### Step4: Follow the workflow

Please read and follow https://github.com/test-pipeline/orthrus/blob/master/docs/Workflow.md

```
docker run --privileged --rm -w /work -it -v `pwd`:/work zjuchenyuan/orthrus /bin/bash

orthrus create -fuzz -asan -cov -sancov
echo '{"fuzzer": "afl-fuzz","fuzzer_args": ""}'>routine.conf
orthrus add --job="mp3gain @@"  -s=/work/seed_mp3 --jobtype=routine --jobconf=routine.conf
# the above step will print the job id
export JOBID=`ls .orthrus/jobs/routine`
# this assumes only one job has been added, you may set it wisely by hand

# this will start 4 afl instances, 2 afl-asan, 2 afl-harden
orthrus start -j $JOBID
# this step will print "Checking core_pattern... failed", 
# but the fuzzing jobs will start successfully, so you can just ignore it.

# next we stop them
pkill -15 afl-fuzz
# this does not work: `orthrus stop -j $JOBID`, after reading source code, it just kill all afl-fuzz processes

# now, we resume this session and stop again
orthrus start -j $JOBID -m
pkill -15 afl-fuzz

# orthrus also includes afl-cov, let's try it
orthrus coverage -j $JOBID
# wait for a while, look up logs
tail -f .orthrus/jobs/routine/$JOBID/afl-out/cov/afl-cov.log
# then you can have a look at generated web reports at .orthrus/jobs/routine/$JOBID/afl-out/cov/web/index.html

# list found crashes files:
find -type f|grep crashes|grep -v README.txt
# Triage crashes (via exploitable)
orthrus triage -j $JOBID

# Obtain crash spectrum
orthrus spectrum -j $JOBID
# then, have a look at .orthrus/jobs/routine/$JOBID/crash-analysis/spectrum

# Obtain runtime crash information, including faulting addresses, crash backtrace etc.
orthrus runtime -j $JOBID
# then, have a look at .orthrus/jobs/routine/$JOBID/crash-analysis/runtime
```
