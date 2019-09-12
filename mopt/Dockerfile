FROM zjuchenyuan/base

RUN git clone https://github.com/puppet-meteor/MOpt-AFL &&\
    cd "MOpt-AFL/MOpt-AFL V1.0" &&\
    make && make install

ENV CC=afl-gcc \
    CXX=afl-g++