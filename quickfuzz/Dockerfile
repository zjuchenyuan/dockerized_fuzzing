FROM zjuchenyuan/base

ADD stack.yaml /tmp/

RUN apt update && apt install -y pkg-config libunwind-dev binutils-dev libtool bnfc zlib1g-dev libgmp-dev libtinfo-dev &&\
    curl -sSL https://get.haskellstack.org/ | sh &&\
    git clone https://github.com/CIFASIS/QuickFuzz --depth 1 &&\
    cd QuickFuzz &&\
    sed -i 's#github.com/CIFASIS/radamsa#gitlab.com/akihe/radamsa#g' install_fuzzers.sh &&\
    ./install_fuzzers.sh &&\
    mv /tmp/stack.yaml ./ &&\
    stack setup