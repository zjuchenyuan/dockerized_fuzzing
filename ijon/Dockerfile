FROM zjuchenyuan/base

LABEL description="Dockerfile for IJON"

RUN apt update && apt install -y llvm-6.0 clang-6.0 

RUN git clone https://github.com/RUB-SysSec/ijon && \
    cd ijon && make &&\
    cd llvm_mode && \
    LLVM_CONFIG=llvm-config-6.0 CC=clang-6.0 make

ENV CC=/ijon/afl-clang-fast \
    CXX=/ijon/afl-clang-fast++

RUN mkdir /data && cd /data &&\
    wget https://raw.githubusercontent.com/RUB-SysSec/ijon-data/8f2048e447559ebd22662893b60adf572279c12c/maze/big.c &&\
    sed 's#//transition(hashint(x,y));#IJON_SET(ijon_hashint(x,y));#' big.c > bigijon.c &&\
    $CC big.c -o big && $CC bigijon.c -o bigijon &&\
    mkdir seed && echo wasd > seed/1