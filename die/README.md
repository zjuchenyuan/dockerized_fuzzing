## DIE

https://hub.docker.com/r/zjuchenyuan/die

Source: https://github.com/sslab-gatech/DIE

```
Version: 48c6c11
More Versions: AFL 2.52b, Node.js v14.15.0, ts-node v9.0.0
Last Update: 2020/08
Type: afl-based
Tag: Aspect-preserving Mutation, JavaScript Engine
```

## Guidance

Here, we follow the authors' guidance for fuzzing [DIE-corpus](https://github.com/sslab-gatech/DIE-corpus), which are collected high-quality JS files for fuzzing JavaScript Engines.

**Start the Redis Server first!**

```
docker run -it --privileged zjuchenyuan/die /bin/bash
service redis-server start
./fuzz/scripts/populate.sh ~/ch ./DIE-corpus ch
tmux ls # you should see fuzzer session
tmux attach -t fuzzer
```

To fuzz a new corpus, you may need another step before fuzzing to obtain the type information (.t files like [this](https://github.com/sslab-gatech/DIE-corpus/blob/master/ChakraCore/ASMJSParser/UnaryPos.js.t)):

```
cd /DIE/fuzz/TS/typer && python3 typer.py <corpus folder>
```

## Modifications

* Use all CPUs to fuzz, instead of `multiprocessing.cpu_count() - 4` (in case of the server has less than 5 CPUs)
* The building command removes tmux call, but the [patch](https://github.com/zjuchenyuan/dockerized_fuzzing/blob/master/die/notmux.patch) is reversed afterwards
* Thanks to [issue #2](https://github.com/sslab-gatech/DIE/issues/2), the populate process needs argument `-C` to work (line 11 of the patch)
* Instead of using SSH tunnel, `redis-server` is directly installed in this image, running on port 9000 and AOF enabled
* Prebuilt `d8` binary from image [andreburgaud/docker-v8](https://github.com/andreburgaud/docker-v8) is included for running typer.py

## Paper

SP2020: Fuzzing JavaScript Engines with Aspect-preserving Mutation [PDF](https://gts3.org/assets/papers/2020/park:die.pdf)