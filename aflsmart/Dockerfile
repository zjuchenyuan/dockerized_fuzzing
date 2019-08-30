FROM zjuchenyuan/base

RUN add-apt-repository ppa:ubuntu-toolchain-r/test &&\
    apt update &&\
    apt install -y tzdata unzip build-essential automake libtool libc6-dev-i386 python-pip g++-multilib mono-complete gcc-4.4 g++-4.4

RUN git clone https://github.com/aflsmart/aflsmart &&\
    cd aflsmart &&\
    make clean all

ENV AFLSMART=/aflsmart \
    PATH=$PATH:/aflsmart:/aflsmart/peach-3.0.202-source/output/linux_x86_64_debug/bin \
    AFL_PATH=/aflsmart \
    LD_LIBRARY_PATH=/usr/local/lib

RUN cd $AFLSMART &&\
    wget https://sourceforge.net/projects/peachfuzz/files/Peach/3.0/peach-3.0.202-source.zip && unzip peach-3.0.202-source.zip &&\
    patch -p1 < peach-3.0.202.patch &&\
    cd peach-3.0.202-source &&\
    CC=gcc-4.4 CXX=g++-4.4 ./waf configure &&\
    CC=gcc-4.4 CXX=g++-4.4 ./waf install
