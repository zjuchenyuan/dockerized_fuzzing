FROM ubuntu:16.04

MAINTAINER zjuchenyuan
LABEL description="Dockerfile for fuzzer base image"

# support apt mirror selection for faster build
# you can build with --build-arg APT=mirrors.aliyun.com
ARG APT

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONIOENCODING=utf8 \
    LC_ALL=C.UTF-8 \
    LANG=C.UTF-8

# install proper tools
RUN ([ "$APT" == "" ] || (sed -i "s/security.ubuntu.com/$APT/g" /etc/apt/sources.list && sed -i "s/archive.ubuntu.com/$APT/g" /etc/apt/sources.list) ) &&\
    apt-get update && \
    apt-get install -y vim nano htop autoconf automake build-essential cmake git sudo software-properties-common gperf libselinux1-dev  bison texinfo flex zlib1g-dev libexpat1-dev libmpg123-dev wget curl python3-pip python-pip &&\
    python -m pip install -U pip &&\
    python3 -m pip install -U pip
