## radamsa

https://hub.docker.com/r/zjuchenyuan/radamsa

Source: https://gitlab.com/akihe/radamsa

```
Version: 0.6
Last Update: 2019/09
Type: Mutator
Language: scheme
```

## Guidance

Download the seed files folder.

```
# apt install -y subversion
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

basic usage:

```
docker run --rm -it -v `pwd`:/work -w /work zjuchenyuan/radamsa \
    sh -c 'echo "aaa" | radamsa'
```

Generate 5 mutated files from `seed_mp3/12566`

```
mkdir -p output/radamsa
docker run -it -v `pwd`:/work -w /work zjuchenyuan/radamsa \
    sh -c 'for i in `seq 1 1 5`; do radamsa < seed_mp3/12566 > output/radamsa/fuzz_$i; done'
```
