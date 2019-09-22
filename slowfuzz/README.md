## SlowFuzz

https://hub.docker.com/r/zjuchenyuan/slowfuzz

Source: https://github.com/nettrino/slowfuzz

```
Version: e124345
Last Update: 2017/11
Type: libfuzzer-based
Tag: Algorithm complexity
```

## Guidance

It's not trivial to write code for using SlowFuzz, here is an example:

https://github.com/nettrino/slowfuzz/tree/master/apps/isort

```
docker run --rm -w /slowfuzz/apps/isort -v `pwd`/output/slowfuzz:/slowfuzz/apps/isort/out2 --privileged zjuchenyuan/slowfuzz \
    sh -c "make test && cp out/* out2/"
```

The output files can be found [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/slowfuzz).

## Paper

CCS 2017: SlowFuzz: Automated Domain-Independent Detection of Algorithmic Complexity Vulnerabilities [PDF](https://arxiv.org/pdf/1708.08437.pdf), [ACM Page](https://dl.acm.org/citation.cfm?id=3134073)