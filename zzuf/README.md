## zzuf

https://hub.docker.com/r/zjuchenyuan/zzuf

Source: https://github.com/samhocevar/zzuf

```
Current Version: e598eef
Last Update: 2019/02
Language: C
Type: Mutator
Tag: determined behaviour
```

## Guidance

Follow http://caca.zoy.org/wiki/zzuf/tutorial2

```
wget https://sourceforge.net/projects/mp3gain/files/mp3gain/1.6.2/mp3gain-1_6_2-src.zip/download -O mp3gain-1_6_2-src.zip
mkdir -p mp3gain1.6.2 && cd mp3gain1.6.2
unzip ../mp3gain-1_6_2-src.zip

# build using gcc
docker run --rm -w /work -it -v `pwd`:/work zjuchenyuan/afl sh -c "make clean; CC=gcc CXX=g++ make"

# download seed files
svn export https://github.com/UNIFUZZ/dockerized_fuzzing_examples/trunk/seed/mp3 seed_mp3
```

zzuf's behavior is determined by parameter, same parameter means same mutated file; basically one input file generate one determined output file.

Here we use -s 0:1000 to run mp3gain 1000 times with different random seeds, -r 0.0001:0.01 means mutation ratio range. However, will zzuf save crash inputs?

```
docker run -w /work -it -v `pwd`:/work --privileged zjuchenyuan/zzuf \
    zzuf -vc -s 0:1000 -r 0.0001:0.01 ./mp3gain seed_mp3/12566
```

Or we can generate 3 mutated files, without invoking mp3gain.

```
mkdir -p output/zzuf
docker run --rm -w /work -it -v `pwd`:/work zjuchenyuan/zzuf \
    sh -c 'for i in `seq 0 1 2`; do zzuf -s $i -r 0.0001:0.01 < seed/mp3/12566 >output/zzuf/$i; done'
```
