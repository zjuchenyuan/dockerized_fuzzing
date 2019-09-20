FROM zjuchenyuan/base

RUN apt update && \
    apt install -y sudo curl wget build-essential make cmake ninja-build git subversion python2.7 binutils-gold binutils-dev python-dev python3 python3-dev python3-pip autoconf automake libtool-bin python-bs4 libclang-4.0-dev gawk pkg-config &&\
    python3 -m pip install --upgrade pip && python3 -m pip install networkx pydot pydotplus

RUN mkdir -p /build && cd /build &&\
    wget http://releases.llvm.org/4.0.0/llvm-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/cfe-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/compiler-rt-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/libcxx-4.0.0.src.tar.xz http://releases.llvm.org/4.0.0/libcxxabi-4.0.0.src.tar.xz &&\
    tar xf llvm-4.0.0.src.tar.xz && tar xf cfe-4.0.0.src.tar.xz && tar xf compiler-rt-4.0.0.src.tar.xz && tar xf libcxx-4.0.0.src.tar.xz && tar xf libcxxabi-4.0.0.src.tar.xz &&\
    rm *.tar.xz &&\
    mv cfe-4.0.0.src /build/llvm-4.0.0.src/tools/clang && mv compiler-rt-4.0.0.src /build/llvm-4.0.0.src/projects/compiler-rt && mv libcxx-4.0.0.src /build/llvm-4.0.0.src/projects/libcxx && mv libcxxabi-4.0.0.src /build/llvm-4.0.0.src/projects/libcxxabi &&\
    mkdir -p build-llvm/llvm; cd build-llvm/llvm &&\
    cmake -G "Ninja" \
      -DLIBCXX_ENABLE_SHARED=OFF -DLIBCXX_ENABLE_STATIC_ABI_LIBRARY=ON \
      -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" \
      -DLLVM_BINUTILS_INCDIR=/usr/include /build/llvm-4.0.0.src &&\
    ninja && ninja install &&\
    mkdir /usr/lib/bfd-plugins && \
    cp /usr/local/lib/libLTO.so /usr/lib/bfd-plugins &&\
    cp /usr/local/lib/LLVMgold.so /usr/lib/bfd-plugins

RUN mkdir -p /build/build-llvm/msan && cd /build/build-llvm/msan &&\
    cmake -G "Ninja" \
      -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ \
      -DLLVM_USE_SANITIZER=Memory -DCMAKE_INSTALL_PREFIX=/usr/msan/ \
      -DLIBCXX_ENABLE_SHARED=OFF -DLIBCXX_ENABLE_STATIC_ABI_LIBRARY=ON \
      -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86" \
       /build/llvm-4.0.0.src &&\
    ninja cxx && ninja install-cxx

RUN git clone https://github.com/aflgo/aflgo.git &&\
    cd aflgo && make all &&\
    cd /aflgo/llvm_mode && make all

ENV AFLGO /aflgo
