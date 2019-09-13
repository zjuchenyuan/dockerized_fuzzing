FROM zjuchenyuan/base

RUN add-apt-repository ppa:ubuntu-toolchain-r/test &&\
    apt update && apt install -y mono-complete g++-4.8-multilib build-essential gcc-4.4 g++-4.4

ENV PATH=/peach-3.0.202-source/output/linux_x86_64_debug/bin:$PATH \
    LD_LIBRARY_PATH=/usr/local/lib

RUN apt install -y unzip tzdata &&\
    wget https://sourceforge.net/projects/peachfuzz/files/Peach/3.0/peach-3.0.202-source.zip && unzip peach-3.0.202-source.zip &&\
    cd peach-3.0.202-source &&\
    CC=gcc-4.4 CXX=g++-4.4 ./waf configure &&\
    CC=gcc-4.4 CXX=g++-4.4 ./waf install