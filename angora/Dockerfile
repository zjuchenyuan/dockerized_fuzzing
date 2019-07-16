FROM zjuchenyuan/base

LABEL description="Dockerfile for Angora"

RUN apt-get install -y git build-essential wget zlib1g-dev golang-go python-pip python-dev build-essential cmake 

ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PIN_ROOT=/pin-3.7-97619-g0d0c92f4f-gcc-linux \
    GOPATH=/go \
    PATH=/clang+llvm/bin:/usr/local/cargo/bin:/angora/bin/:/go/bin:$PATH \
    LD_LIBRARY_PATH=/clang+llvm/lib:$LD_LIBRARY_PATH

RUN git clone https://github.com/AngoraFuzzer/Angora /angora

WORKDIR /angora

RUN ./build/install_rust.sh && \
    PREFIX=/ ./build/install_llvm.sh && \
    ./build/install_tools.sh
RUN ./build/build.sh
RUN ./build/install_pin_mode.sh
