# dockerized_fuzzing
Run fuzzing within Docker

This repo is part of [UNIFUZZ](https://github.com/unifuzz).

## Fuzzers

| Name                                                    | Official Website                   | Mutation/Generation | Directed/Coverage | Source Code/Binary |
| ------------------------------------------------------- | ---------------------------------- | ------------------- | ----------------- | ------------------ |
| [AFL](https://hub.docker.com/r/zjuchenyuan/afl)         | http://lcamtuf.coredump.cx/afl/    | Mutation            | Coverage          | Both               |
| [AFLFast](https://hub.docker.com/r/zjuchenyuan/aflfast) | https://github.com/mboehme/aflfast | Mutation            | Coverage          | Both               |
| [AFLGo](https://hub.docker.com/r/zjuchenyuan/aflgo)     | https://github.com/aflgo/aflgo     | Mutation            | Directed | Source             |
|[AFLPIN](https://hub.docker.com/r/zjuchenyuan/aflpin)|https://github.com/mothran/aflpin|Mutation|Coverage|Binary|
|[AFLSmart](https://hub.docker.com/r/zjuchenyuan/aflsmart)|https://github.com/aflsmart/aflsmart|Mutation|Coverage|Both|
|[Angora](https://hub.docker.com/r/zjuchenyuan/angora)|https://github.com/AngoraFuzzer/Angora|Mutation|Coverage|Both|
|[CodeAlchemist](https://hub.docker.com/r/zjuchenyuan/codealchemist)|https://github.com/SoftSec-KAIST/CodeAlchemist|Generation|n.a.|Binary|
|[Driller](https://hub.docker.com/r/zjuchenyuan/driller)|https://github.com/shellphish/driller|Mutation|Coverage|Binary|
|[Domato](https://hub.docker.com/r/zjuchenyuan/domato)|https://github.com/googleprojectzero/domato|Generation|n.a.|Binary|
|[Dharma](https://hub.docker.com/r/zjuchenyuan/dharma)|https://github.com/MozillaSecurity/dharma|Generation|n.a.|Binary|
|[Eclipser](https://hub.docker.com/r/zjuchenyuan/eclipser)|https://github.com/SoftSec-KAIST/Eclipser|Mutation|Coverage|Source|
|[FairFuzz](https://hub.docker.com/r/zjuchenyuan/fairfuzz)|https://github.com/carolemieux/afl-rb|Mutation|Coverage|Source|
|[Fuzzilli](https://hub.docker.com/r/zjuchenyuan/fuzzilli)|https://github.com/googleprojectzero/fuzzilli|Mutation|Coverage|Source|
|[Grammarinator](https://hub.docker.com/r/zjuchenyuan/grammarinator)|https://github.com/renatahodovan/grammarinator|Generation|n.a.|Binary|
|[Honggfuzz](https://hub.docker.com/r/zjuchenyuan/honggfuzz)|https://github.com/google/honggfuzz|Mutation|Coverage|Source|
|[IJON](https://hub.docker.com/r/zjuchenyuan/ijon)|https://github.com/RUB-SysSec/ijon|Mutation|Coverage|Source|
|[Jsfuzz](https://hub.docker.com/r/zjuchenyuan/jsfuzz)|https://github.com/fuzzitdev/jsfuzz|Mutation|Coverage|Source|
|[jsfunfuzz](https://hub.docker.com/r/zjuchenyuan/jsfunfuzz)|https://github.com/MozillaSecurity/funfuzz|Generation|n.a.|Binary|
|[MoonLight](https://hub.docker.com/r/zjuchenyuan/moonlight)|https://gitlab.anu.edu.au/lunar/moonlight|n.a.|n.a.|n.a.|
|[MOPT](https://hub.docker.com/r/zjuchenyuan/mopt)|https://github.com/puppet-meteor/MOpt-AFL|Mutation|Coverage|Both|
|[NAUTILUS](https://hub.docker.com/r/zjuchenyuan/nautilus)|https://github.com/RUB-SysSec/nautilus|Both|Coverage|Source|
|[NEUZZ](https://hub.docker.com/r/zjuchenyuan/neuzz)|https://github.com/Dongdongshe/neuzz|Mutation|Coverage|Source|
|[NEZHA](https://hub.docker.com/r/zjuchenyuan/nezha)|https://github.com/nezha-dt/nezha|Mutation|Coverage|LibFuzzer|
|[LearnAFL](https://hub.docker.com/r/zjuchenyuan/learnafl)|https://github.com/MoonLight-SteinsGate/LearnAFL|Mutation|Coverage|Source|
|[radamsa](https://hub.docker.com/r/zjuchenyuan/radamsa)|https://gitlab.com/akihe/radamsa|Mutation|Coverage|Binary|
|[slowfuzz](https://hub.docker.com/r/zjuchenyuan/slowfuzz)|https://github.com/nettrino/slowfuzz|Mutation|n.a.|LibFuzzer|
|[Superion](https://hub.docker.com/r/zjuchenyuan/superion)|https://github.com/zhunki/Superion|Both|Coverage|Source|
|[T-Fuzz](https://hub.docker.com/r/zjuchenyuan/tfuzz)|https://github.com/HexHive/T-Fuzz|Mutation|Coverage|Source|
|[QSYM](https://hub.docker.com/r/zjuchenyuan/qsym)|https://github.com/sslab-gatech/qsym|Mutation|Coverage|Binary|
|[QuickFuzz](https://hub.docker.com/r/zjuchenyuan/quickfuzz)|https://github.com/CIFASIS/QuickFuzz|Both|n.a.|Binary|
|[Orthrus](https://hub.docker.com/r/zjuchenyuan/orthrus)|https://github.com/test-pipeline/orthrus|n.a.|n.a.|n.a.|
|[Peach](https://hub.docker.com/r/zjuchenyuan/peach)|https://github.com/MozillaSecurity/peach|Generation|n.a.|Binary|
|[PTfuzz](https://hub.docker.com/r/zjuchenyuan/ptfuzzer)|https://github.com/hunter-ht-2018/ptfuzzer|Mutation|Coverage|Source|
|[VUzzer64](https://hub.docker.com/r/zjuchenyuan/vuzzer64)|https://github.com/vusec/vuzzer64|Mutation|Coverage|Binary|
|[zzuf](https://hub.docker.com/r/zjuchenyuan/zzuf)|https://github.com/samhocevar/zzuf|Mutation|n.a.|Binary|

### Welcome PR

We are willing to accept pull requests for new fuzzers! Please follow these instructions:

1. Edit the above table to include your fuzzer name, DockerHub link, and type information.
2. In your DockerHub README, provide guidance for using your fuzzer, detailed steps are appreciated (you can follow the guidance template of [AFL](https://hub.docker.com/r/zjuchenyuan/afl)).
3. Provide Dockerfile for building the fuzzer.
4. If your fuzzer requires customized compilation steps rather than just AFL-instrumentation, please also implement [unibench_build](https://github.com/unifuzz/unibench_build) Dockerfile for building 20 unibench programs, so that your fuzzer can be directly used for evaluation.
