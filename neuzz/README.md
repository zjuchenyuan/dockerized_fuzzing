## NEUZZ: neural network assisted fuzzer 

Source: https://github.com/Dongdongshe/neuzz

```
Current Version: 2c71795
More Versions: tensorflow 1.14.0, python 3.5.2
Last Update: 2019/09

```

## Usage

You may follow this official [REAMDE](https://github.com/Dongdongshe/neuzz/tree/master/programs/readelf)

```
docker run -it -w /data -v `pwd`/output:/data zjuchenyuan/neuzz /bin/bash
# in the container
cp -r /neuzz/programs/readelf/* ./
cp /neuzz/neuzz /neuzz/nn.py /neuzz/afl-showmap ./
python3 nn.py ./readelf -a &
./neuzz -i neuzz_in -o seeds -l `ls -lS neuzz_in|head -n 2|tail -n 1|awk '{print $5}'` ./readelf -a @@
```

## Paper

IEEE S&P 2019 NEUZZ: Efficient Fuzzing with Neural Program Smoothing [PDF](https://arxiv.org/pdf/1807.05620.pdf)