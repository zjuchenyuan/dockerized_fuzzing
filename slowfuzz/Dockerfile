FROM zjuchenyuan/base

RUN apt update && apt install -y clang-4.0

RUN git clone https://github.com/nettrino/slowfuzz &&\
    cd slowfuzz/apps/isort &&\
    make fuzzer &&\
    make

#RUN cd slowfuzz/apps/isort && make test; exit 0