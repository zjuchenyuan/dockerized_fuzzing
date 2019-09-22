## Superion

https://hub.docker.com/r/zjuchenyuan/superion

Source: https://github.com/zhunki/Superion

```
Version: e3e2576
More Versions: antlr 4.7, LLVM 3.8
Last Update: 2019/03
Type: AFL-based, Grammar-Aware
File formats: XML, JavaScript, PHP
```

## Guidance

In this guidance, we will use Superion to fuzz [quickjs](https://bellard.org/quickjs/) 2019-09-01 version, 
and we choose [webkit/JSTests/stress](https://github.com/WebKit/webkit/tree/master/JSTests/stress) from WebKit as seed files.

The usage of quickjs is basically compile a js to c code (rather than compile to ELF), writing to /dev/null eliminate unnecessary I/O.

```
/quickjs-2019-09-01/qjsc @@ -o /dev/null -c
```

Compilation of QuickJS and preparation of seed files including size selection and using afl-cmin to deduplicate has been added to the image, let's just start fuzzing!

```
echo "" | sudo tee /proc/sys/kernel/core_pattern
echo 0 | sudo tee /proc/sys/kernel/core_uses_pid
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
echo 1 | sudo tee /proc/sys/kernel/sched_child_runs_first
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space

docker run --privileged -it -w /Superion zjuchenyuan/superion \
    ./afl-fuzz -m 1G -t 100+ -i inputs -o out /quickjs-2019-09-01/qjsc @@ -o /dev/null -c
```

## Paper

ICSE 2019: Superion: Grammar-Aware Greybox Fuzzing [PDF](https://arxiv.org/pdf/1812.01197.pdf)