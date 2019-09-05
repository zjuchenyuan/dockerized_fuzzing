FROM zjuchenyuan/base

RUN apt update && apt install -y  libdwarf-dev libelf-dev gcc-4.8 g++-4.8 &&\
    update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 10 &&\
    update-alternatives --install /usr/bin/g++ g++ /usr/bin/gcc-4.8 10 &&\
    wget https://software.intel.com/sites/default/files/managed/18/d9/pinplay-1.2-pin-2.13-62732-gcc.4.4.7-linux.tar.gz &&\
    tar xf pinplay-1.2-pin-2.13-62732-gcc.4.4.7-linux.tar.gz

ENV PIN_ROOT=/pinplay-1.2-pin-2.13-62732-gcc.4.4.7-linux \
    LD_LIBRARY_PATH=/pinplay-1.2-pin-2.13-62732-gcc.4.4.7-linux/intel64/runtime

RUN git clone https://github.com/mothran/aflpin &&\
    cd aflpin && mkdir obj-intel64 &&\
    sed -i 's#-fdiagnostics-color=auto##' Config/makefile.unix.config &&\
    make obj-intel64/aflpin.so

RUN git clone https://github.com/mirrorer/afl &&\
    cd afl && git checkout df7c3f63d7 &&\
    sed -i 's/FATAL("No instrumentation detected");/SAYF("This is as expected for AFLPIN\\n");/' afl-fuzz.c &&\
    make && make install
