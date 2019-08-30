FROM ubuntu:16.04

MAINTAINER zjuchenyuan
LABEL description="Dockerfile for fuzzer base image"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=noninteractive

# install proper tools
RUN apt-get update && \
    apt-get install -y vim nano htop autoconf automake build-essential cmake git sudo software-properties-common gperf libselinux1-dev  bison texinfo flex zlib1g-dev libexpat1-dev libmpg123-dev
