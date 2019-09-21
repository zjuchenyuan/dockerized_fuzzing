## QuickFuzz

https://hub.docker.com/r/zjuchenyuan/quickfuzz

Source: https://github.com/CIFASIS/QuickFuzz

Modification: Since some Haskell packages has been upgraded, breaking the dependencies, we have to add `semigroupoids-5` to `stack.yaml` to compile successfully.

```
Version: 1.0
More Versions: Haskell Stack 1.5.1, ghc 7.10.3
Last Update: 2017/12
Type: Generator
File formats: asn1, bnfc, c, crl, css, eps, evm, gif, glsl, go, html, http, jpeg, js, lua, pdf, png, ps, py, regex, svg, tar, tga, tiff, wav, x509, xml, zip
```

## Guidance

Generate 6 html files in `output/quickfuzz`. (Pure DOM, no javascript)

```
mkdir -p output/quickfuzz
docker run --rm -w /work -it -v `pwd`:/work zjuchenyuan/quickfuzz \
    QuickFuzz gen html -o output/quickfuzz -q 5
```

You can view generated files [here](https://github.com/UNIFUZZ/dockerized_fuzzing_examples/tree/master/output/quickfuzz).

## Paper

Haskell 2016: QuickFuzz: An Automatic Random Fuzzer for Common File Formats [PDF](https://people.kth.se/~buiras/publications/QFHaskell2016.pdf) [ACM Page](https://dl.acm.org/citation.cfm?id=2976017)