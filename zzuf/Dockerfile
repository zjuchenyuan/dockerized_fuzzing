FROM zjuchenyuan/base

RUN apt install -y build-essential libtool pkg-config

RUN git clone https://github.com/samhocevar/zzuf &&\
    cd zzuf &&\
    ./bootstrap && ./configure && make && make install

