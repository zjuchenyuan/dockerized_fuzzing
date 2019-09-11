FROM zjuchenyuan/base

RUN apt update && apt install -y uuid-dev clang unzip pkg-config subversion

RUN git clone https://github.com/zhunki/Superion &&\
    cd /Superion/tree_mutation &&\
    cmake . && make -j4 &&\
    cd js_parser &&\
    for f in *.cpp; do g++ -I ../runtime/src/ -c $f -fPIC -std=c++11; done &&\
    g++ -shared -std=c++11 *.o ../dist/libantlr4-runtime.a  -o libTreeMutation.so
RUN cd /Superion &&\
    sed -i 's#./tree_mutation/php_parser/libTreeMutation.so#./tree_mutation/js_parser/libTreeMutation.so#' Makefile &&\
    make &&\
    cd /Superion/llvm_mode &&\
    LLVM_CONFIG=llvm-config-3.8 CXXFLAGS="-DLLVM38" make

RUN wget https://bellard.org/quickjs/quickjs-2019-09-01.tar.xz &&\
    tar xf quickjs-2019-09-01.tar.xz &&\
    cd quickjs-2019-09-01 &&\
    sed -i 's/CONFIG_LTO=y/CONFIG_LTO=y\nCONFIG_CLANG=y/' Makefile &&\
    sed -i 's#LIBS=-lm#LIBS=-lm\nCC=/Superion/afl-clang-fast#' Makefile &&\
    sed -i 's/CONFIG_LTO=y/#CONFIG_LTO=y/' Makefile &&\
    sed -i 's/CONFIG_M32=y/#CONFIG_M32=y/' Makefile &&\
    AFL_HARDEN=1 make

RUN svn export https://github.com/WebKit/webkit/trunk/JSTests/stress &&\
    cd stress &&\
    find -size +10k -print -delete &&\
    cd /Superion/ &&\
    chmod +x ./afl-cmin &&\
    ./afl-cmin -i /stress -o inputs -m 1024 -- /quickjs-2019-09-01/qjsc @@ -o /dev/null -c
