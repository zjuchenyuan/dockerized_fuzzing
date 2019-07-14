FROM zjuchenyuan/base

LABEL description="Dockerfile for AFLFast"

RUN git clone https://github.com/mboehme/aflfast && \
    cd aflfast && \
    make && make install

ENV CC=afl-gcc \
    CXX=afl-g++
