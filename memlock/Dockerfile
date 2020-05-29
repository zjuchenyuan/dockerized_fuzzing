FROM zjuchenyuan/base

RUN apt update && apt install -y wget git build-essential tmux cmake libtool automake autoconf autotools-dev m4 autopoint help2man bison flex texinfo zlib1g-dev libexpat1-dev libfreetype6 libfreetype6-dev sudo

ENV PATH="/MemLock/clang+llvm/bin:$PATH" LD_LIBRARY_PATH="/MemLock/clang+llvm/lib:$LD_LIBRARY_PATH"

RUN git clone https://github.com/wcventure/MemLock-Fuzz /MemLock --depth 1 &&\
    cd MemLock &&\
    ./tool/install_llvm.sh &&\
    ./tool/install_MemLock.sh

WORKDIR /MemLock