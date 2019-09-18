## T-Fuzz

https://hub.docker.com/r/zjuchenyuan/tfuzz

Source: https://github.com/HexHive/T-Fuzz

Modification:

- Do not build QEMU for afl, as T-Fuzz will not use it
- fix Deprecation Warning issue, see https://github.com/HexHive/T-Fuzz/issues/12
- fix create_dict.py for python2

## Guidance

Fuzzing MP3Gain 1.6.2 as an example.

### Step1: System configuration & Step2: Compile target programs

Please refer to [AFL Guidance](https://hub.docker.com/r/zjuchenyuan/afl). 

### Step3: Start Fuzzing

```
cd $WORKDIR/example
docker run --rm -w /work -it -v `pwd`:/work --privileged zjuchenyuan/tfuzz \
    /T-Fuzz/TFuzz --program build/mp3gain/afl/justafl/mp3gain --work_dir output/tfuzz --seed_dir seed/mp3 --target_opts @@
```

## Possible issues

T-Fuzz may be using wrong code to filter usable seeds, treating all non-zero return code as crashing seed, and generating a random seed for AFL to use instead of using provided seed sets.

This issue is not addressed in UNIFUZZ experiments.

https://github.com/HexHive/T-Fuzz/issues/18