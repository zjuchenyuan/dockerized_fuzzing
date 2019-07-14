FROM zjuchenyuan/base

LABEL description="Dockerfile for AFL"

RUN git clone https://github.com/mirrorer/afl && \
    cd afl && \
    make && make install

ENV CC=afl-gcc \
    CXX=afl-g++
