FROM zjuchenyuan/base

LABEL description="Dockerfile for honggfuzz"

RUN apt install -y libunwind8-dev binutils-dev clang-6.0 &&\
    update-alternatives --install /usr/bin/clang clang /usr/bin/clang-6.0 50 &&\
    update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-6.0 50

RUN git clone https://github.com/google/honggfuzz.git &&\
    cd honggfuzz && git checkout master &&\
    make && cp /honggfuzz/honggfuzz /bin

WORKDIR /honggfuzz

ENV CC=/honggfuzz/hfuzz_cc/hfuzz-clang CXX=/honggfuzz/hfuzz_cc/hfuzz-clang++