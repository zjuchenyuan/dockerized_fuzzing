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
    cd vuzzer64 && git checkout ef51c49dd3e803592aeaa175de554c0405c9218e && cd .. &&\
    patch -p0 < patchfile &&\
    cd vuzzer64/fuzzer-code &&\
    make &&\
    cd ../libdft64 &&\
    make

#RUN python -m pip install -U pip &&\
#    python -m pip install angr==7.8.9.26 networkx==1.11 angr-utils &&\
#    git clone https://github.com/ash09/angr-static-analysis-for-vuzzer64

RUN apt install -y python3-pip libffi-dev 

RUN pip3 install angr==8.19.7.25 networkx==1.11 angr-utils &&\
    git clone https://github.com/ash09/angr-static-analysis-for-vuzzer64 &&\
    cd /angr-static-analysis-for-vuzzer64 &&\
    2to3 -w BB-weight-angr.py &&\
    sed -i 's/main_bin/main_object/g' BB-weight-angr.py &&\
    sed -i 's/CFGAccurate/CFGEmulated/g' BB-weight-angr.py &&\
    sed -i 's/"w"/"wb"/' BB-weight-angr.py &&\
    sed -i "s/'w'/'wb'/" BB-weight-angr.py &&\
    sed -i "s#'_hash', 'soot_block'#'_hash', 'soot_block', 'weight'#" /usr/local/lib/python3.5/dist-packages/angr/knowledge_plugins/cfg/cfg_node.py