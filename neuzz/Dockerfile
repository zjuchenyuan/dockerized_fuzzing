FROM zjuchenyuan/base

RUN python3 -m pip install -U setuptools Keras tensorflow &&\
    dpkg --add-architecture i386 &&\
    apt-get update &&\
    apt-get install -y libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1

RUN git clone https://github.com/Dongdongshe/neuzz &&\
    cd neuzz &&\
    gcc -O3 -funroll-loops ./neuzz.c -o neuzz