FROM zjuchenyuan/base

ENV PATH=/QuickFuzz/.stack-work/install/x86_64-linux/lts-5.9/7.10.3/bin:/root/.local/bin:$PATH

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 575159689BEFB442 &&\
    echo 'deb http://download.fpcomplete.com/ubuntu xenial main'|sudo tee /etc/apt/sources.list.d/fpco.list &&\
    apt update && apt install -y stack pkg-config libunwind-dev binutils-dev libtool bnfc zlib1g-dev libgmp-dev libtinfo-dev

RUN git clone https://github.com/CIFASIS/QuickFuzz --depth 1 &&\
    cd QuickFuzz &&\
    sed -i 's#github.com/CIFASIS/radamsa#gitlab.com/akihe/radamsa#g' install_fuzzers.sh &&\
    ./install_fuzzers.sh

RUN cd /QuickFuzz && stack setup &&\
    stack install alex happy &&\
    sed -i 's/explicit-setup-deps:/- semigroupoids-5\nexplicit-setup-deps:/' stack.yaml &&\
    stack build --flag QuickFuzz:all

