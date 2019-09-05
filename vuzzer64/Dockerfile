FROM zjuchenyuan/base

RUN apt install -y unzip bmagic python-pip &&\
    wget https://software.intel.com/sites/landingpage/pintool/downloads/pin-3.7-97619-g0d0c92f4f-gcc-linux.tar.gz &&\
    tar xf pin-3.7-97619-g0d0c92f4f-gcc-linux.tar.gz &&\
    wget https://github.com/lemire/EWAHBoolArray/archive/0.4.0.zip -O EWAHBoolArray.zip &&\
    unzip EWAHBoolArray.zip &&\
    cp EWAHBoolArray-0.4.0/headers/* /usr/include/ &&\
    pip install BitVector

ENV PIN_HOME=/pin-3.7-97619-g0d0c92f4f-gcc-linux \
    PIN_ROOT=/pin-3.7-97619-g0d0c92f4f-gcc-linux \
    DFT_HOME=/vuzzer64/libdft64

ADD patchfile /

RUN git clone https://github.com/vusec/vuzzer64 &&\
    patch -p0 < patchfile &&\
    cd vuzzer64/fuzzer-code &&\
    make &&\
    cd ../libdft64 &&\
    make