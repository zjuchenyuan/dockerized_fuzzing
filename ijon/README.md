## IJON

https://hub.docker.com/r/zjuchenyuan/ijon

Source: https://github.com/RUB-SysSec/ijon

```
Version: 56ebfe3
Last Update: 2020/04
Type: afl-based
Tag: human-in-the-loop, dataflow coverage
```

## Guidance

Human annotation is needed to use IJON. Here we choose big maze code as an example to illustrate the whole fuzzing process.

Source code [big.c](https://github.com/RUB-SysSec/ijon-data/blob/8f2048e447559ebd22662893b60adf572279c12c/maze/big.c)

#### About the target

Game rule: from left-top point, use arrow keys (wasd) to get the point `#`.

The program will read input from stdin.

```
+-+-------------+
| |             |
| | +-----* *---+
|   |           |
+---+-* *-------+
|               |
+ +-------------+
| |       |   |#|
| | *---+ * * *X|
| |     |   |   |
| +---* +-------+
|               |
+---------------+

a.out: big.c:84: int main(int, char **): Assertion `0' failed.
Aborted
```

> The above figure is the target, which means we successfully finished the maze game.

#### First, we need to figure out how to provide useful feedback.

In this case, the coordinate `(x, y)` would be a good feedback, once we step into a new point, a new coverage will be generated.

So, we write this line: `IJON_SET(ijon_hashint(x,y));` in the loop.

This step has been done by the Dockerfile, you can check out `/data/bigijon.c` in the container.

#### Fuzz! Try IJON without this feedback

To demonstrate the effectiveness of this extra feedback, we first try fuzz without it.

```
docker run -it --rm -w /data -v `pwd`/out1:/data/out1 --privileged zjuchenyuan/ijon \
    /ijon/afl-fuzz -i seed -o out1 -- ./big
```

And you will find AFL can only find about 30 paths in 5 minutes.

#### Real Fuzz with IJON

```
docker run -it --rm -w /data -v `pwd`/out2:/data/out2 --privileged zjuchenyuan/ijon \
    /ijon/afl-fuzz -i seed -o out2 -- ./bigijon
```

This fuzz process will find the crash in about 5 minutes (with about 90 paths).

## Paper

Oakland 2020: IJON: Exploring Deep State Spaces via Fuzzing [PDF](https://www.syssec.ruhr-uni-bochum.de/media/emma/veroeffentlichungen/2020/02/27/IJON-Oakland20.pdf)