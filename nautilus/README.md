## Nautilus: a grammar based feedback fuzzer

Source: https://github.com/RUB-SysSec/nautilus

```
Current Version: dd3554a
More Versions: ruby 2.3.1p112, cargo 1.37.0, rustc 1.37.0
Last Update: 2019/04
Type: grammar based feedback fuzzer
Tag: rust
```

## Usage

You may follow instructions from official [README](https://github.com/RUB-SysSec/nautilus).

Note that this image has built target program [mruby](https://github.com/mruby/mruby) in the `/nautilus/forksrv/instrument/mruby` folder,
and config.ron has been updated to test mruby.

```
docker run -it -v `pwd`/output:/nautilus/outputs -w /nautilus zjuchenyuan/nautilus /nautilus/target/debug/fuzzer
```

## Paper

NDSS2019 NAUTILUS: Fishing for Deep Bugs with Grammars [PDF](https://www.syssec.ruhr-uni-bochum.de/media/emma/veroeffentlichungen/2018/12/17/NDSS19-Nautilus.pdf)