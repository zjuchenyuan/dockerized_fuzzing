FROM zjuchenyuan/base

LABEL description="Dockerfile for honggfuzz"

RUN apt install -y libunwind8-dev binutils-dev clang-6.0

RUN git clone --depth=1 https://github.com/google/honggfuzz.git
WORKDIR /honggfuzz
RUN make && cp /honggfuzz/honggfuzz /bin

ENV CC=/honggfuzz/hfuzz_cc/hfuzz-clang CXX=/honggfuzz/hfuzz_cc/hfuzz-clang++