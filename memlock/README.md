## MemLock

https://hub.docker.com/r/zjuchenyuan/memlock

Source: https://github.com/wcventure/MemLock-Fuzz

```
Version: dc2967f
More Versions: AFL 2.52b
Last Update: 2020/04
Type: afl-based
Tag: memory consumption
```

## Guidance

The author of MemLock provides pretty well scripts for building and running evaluations, so let's just use them.

Here, we fuzz cxxfilt as an example.

```
docker run -it --privileged zjuchenyuan/memlock /bin/bash
cd /MemLock/evaluation/BUILD
./build_cxxfilt.sh

cd /MemLock/evaluation/FUZZ
./run_MemLock_cxxfilt.sh
```

## Paper

ICSE 2020: MemLock: Memory Usage Guided Fuzzing [PDF](https://wcventure.github.io/pdf/ICSE2020_MemLock.pdf)