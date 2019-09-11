Oops, the output is too big for git repo. 

Fuzzing [readelf](https://github.com/Dongdongshe/neuzz/tree/master/programs/readelf), running only with 4-cores CPU for about 12 hours.

[You can download the zipped file here.](https://zjueducn-my.sharepoint.com/:u:/g/personal/chenyuan_zju_edu_cn/EXMJDawYk1lFv2gDA28NIIABl4lUqWT9WFBhVMYGJvlhOQ?e=qDaboK) 252MB

```
docker run --privileged -it zjuchenyuan/neuzz
cd /neuzz
cp neuzz nn.py alf-showmap  programs/readelf/
cd programs/readelf/
mkdir seeds
python3 nn.py ./readelf -a &
./neuzz -i neuzz_in -o seeds -l 7507 ./readelf -a @@
```