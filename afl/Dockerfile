FROM ubuntu:16.04

MAINTAINER zjuchenyuan
LABEL description="Dockerfile for AFL"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=noninteractive

# install proper tools
RUN apt-get update && \
    apt-get install -y vim nano htop autoconf automake build-essential cmake git

RUN git clone https://github.com/mirrorer/afl && \
    cd afl && \
    make && make install

ENV CC=afl-gcc \
    CXX=afl-g++
