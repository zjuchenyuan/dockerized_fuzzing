## AFLGo: Directed Greybox Fuzzing

https://github.com/aflgo/aflgo

Source: https://github.com/aflgo/aflgo

```
Current Version: 2.52b
More Versions: LLVM 4.0 (build from souce to have Gold Plugin)
Last Update: 2019/08
Type: AFL-based
Tag: directed fuzzing
```

## Tutorial

Here is an example of using AFLGo: http://strongcourage.github.io/2019/06/20/aflgo.html

[aflgo_example_lrzip](https://hub.docker.com/r/zjuchenyuan/aflgo_example_lrzip)

## Dockerfile

```
FROM zjuchenyuan/base

RUN apt update && \
    apt install -y sudo curl wget build-essential make cmake ninja-build git subversion python2.7 binutils-gold binutils-dev python-dev python3 python3-dev python3-pip autoconf automake libtool-bin python-bs4 libclang-4.0-dev &&\
    python3 -m pip install --upgrade pip && python3 -m pip install networkx pydot pydotplus

RUN mkdir -p /build/chromium_tools && cd /build/chromium_tools &&\
    git clone https://chromium.googlesource.com/chromium/src/tools/clang && cd .. &&\
    wget http://releases.llvm.org/4.0.0/llvm-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/cfe-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/compiler-rt-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/libcxx-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/libcxxabi-4.0.0.src.tar.xz &&\
    tar xf llvm-4.0.0.src.tar.xz && tar xf cfe-4.0.0.src.tar.xz && tar xf compiler-rt-4.0.0.src.tar.xz && tar xf libcxx-4.0.0.src.tar.xz && tar xf libcxxabi-4.0.0.src.tar.xz &&\
    mv cfe-4.0.0.src /build/llvm-4.0.0.src/tools/clang && mv compiler-rt-4.0.0.src /build/llvm-4.0.0.src/projects/compiler-rt && mv libcxx-4.0.0.src /build/llvm-4.0.0.src/projects/libcxx && mv libcxxabi-4.0.0.src /build/llvm-4.0.0.src/projects/libcxxabi &&\
    mkdir -p build-llvm/llvm; cd build-llvm/llvm &&\
    cmake -G "Ninja" \
      -DLIBCXX_ENABLE_SHARED=OFF -DLIBCXX_ENABLE_STATIC_ABI_LIBRARY=ON \
      -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" \
      -DLLVM_BINUTILS_INCDIR=/usr/include /build/llvm-4.0.0.src &&\
    ninja && ninja install

RUN mkdir -p /build/build-llvm/msan && cd /build/build-llvm/msan &&\
    cmake -G "Ninja" \
      -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ \
      -DLLVM_USE_SANITIZER=Memory -DCMAKE_INSTALL_PREFIX=/usr/msan/ \
      -DLIBCXX_ENABLE_SHARED=OFF -DLIBCXX_ENABLE_STATIC_ABI_LIBRARY=ON \
      -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" \
       /build/llvm-4.0.0.src &&\
    ninja cxx && ninja install-cxx

RUN mkdir /usr/lib/bfd-plugins && \
    cp /usr/local/lib/libLTO.so /usr/lib/bfd-plugins &&\
    cp /usr/local/lib/LLVMgold.so /usr/lib/bfd-plugins

RUN git clone https://github.com/aflgo/aflgo.git &&\
    cd aflgo && make all

RUN cd /aflgo/llvm_mode && make all

ENV AFLGO /aflgo

RUN apt install -y gawk pkg-config
```

Since DockerHub auto-build cannot build LLVM in 4 hours (maxinum time allowed for building Docker images), I locally built and pushed the image.

### Need help

I investigated many methods to skip the building process, but in vain: https://github.com/aflgo/aflgo/issues/51

Can you help building aflgo without building LLVM? Please also build [this image](https://hub.docker.com/r/zjuchenyuan/aflgo_example_lrzip/dockerfile) to verify your built aflgo can build target program.


## Paper

CCS 2017: Directed Greybox Fuzzing [PDF](https://mboehme.github.io/paper/CCS17.pdf)