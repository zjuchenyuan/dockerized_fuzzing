## NEZHA

https://hub.docker.com/r/zjuchenyuan/nezha

Source: https://github.com/nezha-dt/nezha

This image uses v0.1 version, and will not keep update with latest version. Not a big problem, since the code repository is archived.

Modifications:

- libfuzzer has been deleted from google, we need to checkout an older version
- the test step of build process has a memory leak, we use `ASAN_OPTIONS=detect_leaks=0` to bypass

```
Version: v0.1
Last Update: 2017/08 Archived
Type: Differential Testing, libfuzzer-based
```

## Tutorial

Follow helloworld example tutorial: https://github.com/nezha-dt/nezha/tree/v0.1/examples/src/apps/helloworld .

```
docker run -it --privileged zjuchenyuan/nezha /bin/bash
# in the container
cd /nezha/examples/src/apps/helloworld
make nezha
./nezha_main -diff_od=1 out
```

## Paper

S&P 2017: NEZHA: Efficient Domain-Independent Differential Testing. [PDF](https://www.ieee-security.org/TC/SP2017/papers/390.pdf)
