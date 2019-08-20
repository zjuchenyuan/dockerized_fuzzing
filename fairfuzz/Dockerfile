FROM zjuchenyuan/base

LABEL description="Dockerfile for FairFuzz"

RUN git clone https://github.com/carolemieux/afl-rb && \
    cd afl-rb && \
    make && make install

ENV CC=afl-gcc \
    CXX=afl-g++
