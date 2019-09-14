FROM zjuchenyuan/base

LABEL description="Dockerfile for AFL"

RUN git clone https://github.com/mirrorer/afl && \
    cd afl && \
    make && make install

RUN cd afl/llvm_mode &&\
    make

ENV CC=afl-gcc \
    CXX=afl-g++
