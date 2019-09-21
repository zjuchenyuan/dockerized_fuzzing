## Grammarinator

https://hub.docker.com/r/zjuchenyuan/grammarinator

Source: https://github.com/renatahodovan/grammarinator

```
Version: 19.3
More Versions: Python 3.5.2, openjdk 1.8.0_222, ANTLR v4
Last Update: 2019/08
Type: Generator
File formats: HTML
```

## Example Usage

Refer to https://github.com/renatahodovan/grammarinator

```
mkdir -p output/grammarinator
docker run -w /grammarinator -it -v `pwd`:/work zjuchenyuan/grammarinator \
    sh -c "grammarinator-process examples/grammars/HTMLLexer.g4 examples/grammars/HTMLParser.g4 -o examples/fuzzer/ &&\
        grammarinator-generate -l examples/fuzzer/HTMLCustomUnlexer.py -p examples/fuzzer/HTMLCustomUnparser.py -r htmlDocument -o /work/output/grammarinator/test_%d.html -t HTMLUnparser.html_space_transformer -n 100 -d 20"
```

## Paper

A-TEST 2018: Grammarinator: A Grammar-Based Open Source Fuzzer [ACM Page](https://dl.acm.org/citation.cfm?id=3278193)