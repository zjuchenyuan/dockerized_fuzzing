FROM zjuchenyuan/base

RUN apt update &&\
    apt install -y g++-multilib clang llvm-3.8-dev ruby bison ruby-dev

RUN git clone https://github.com/RUB-SysSec/nautilus.git &&\
    cd /nautilus/forksrv/instrument/rt &&\
    make &&\
    cd /nautilus/forksrv/instrument/clang_wrapper &&\
    make

RUN git clone https://github.com/mruby/mruby.git /nautilus/forksrv/instrument/mruby &&\
    cd /nautilus/forksrv/instrument/mruby &&\
    CC=/nautilus/forksrv/instrument/clang_wrapper/redqueen-clang \
    LD=/nautilus/forksrv/instrument/clang_wrapper/redqueen-clang \
    make

ENV PATH=/root/.cargo/bin:$PATH

RUN curl -o rustup-init.sh -sSf https://sh.rustup.rs &&\
    sh rustup-init.sh -y &&\
    rustup install nightly &&\
    cd nautilus &&\
    mkdir -p outputs/queue &&\
    sed -i 's#/data/projects/grammar_fuzz/gramophone#/nautilus#g' config.ron &&\
    sed -i 's#"/nautilus"#"/nautilus/"#' config.ron &&\
    cargo +nightly build