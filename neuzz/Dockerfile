FROM zjuchenyuan/base

RUN python3 -m pip install -U setuptools Keras tensorflow

RUN git clone https://github.com/Dongdongshe/neuzz

RUN dpkg --add-architecture i386 &&\
    apt-get update &&\
    apt-get install -y libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1