FROM zjuchenyuan/base

RUN git clone https://github.com/nezha-dt/nezha &&\
    cd nezha && git checkout v0.1 &&\
    sed -i 's#pushd libFuzzer >/dev/null#pushd libFuzzer\ngit checkout 273735e#' ./utils/build_helpers/build_dependencies.sh &&\
    ASAN_OPTIONS=detect_leaks=0 ./utils/build_helpers/setup.sh

RUN apt install -y libxml2-dev libbz2-dev libgcrypt20-dev &&\
    cd /nezha/examples/src/apps/xz &&\
    make nezha &&\
    make &&\
    cd /nezha/examples/src/apps/helloworld &&\
    make nezha &&\
    make &&\
    cd /nezha/examples/src/apps/sslcert &&\
    make nezha &&\
    make
