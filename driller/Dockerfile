FROM zjuchenyuan/base

RUN sed -i 's/# deb-src/deb-src/g' /etc/apt/sources.list &&\
    apt-get update && apt-get build-dep -y qemu-system && apt install -y libtool libtool-bin git build-essential gcc-multilib libtool automake autoconf bison debootstrap debian-archive-keyring libacl1-dev  python3-pip python-virtualenv

#RUN pip install -U git+https://github.com/shellphish/shellphish-afl
RUN git clone https://github.com/shellphish/shellphish-afl &&\
    cd shellphish-afl &&\
    sed -i 's#"aarch64", "x86_64", "i386", "arm", "ppc", "ppc64", "mips", "mipsel", "mips64"#"x86_64", "i386"#' setup.py &&\
    sed -i 's/fetcharch armhf ubuntu trusty/#fetcharch armhf ubuntu trusty/' fetchlibs.sh &&\
    sed -i 's/fetcharch armel debian jessie/#fetcharch armel debian jessie/' fetchlibs.sh &&\
    sed -i 's/fetcharch powerpc ubuntu trusty/#fetcharch powerpc ubuntu trusty/' fetchlibs.sh &&\
    sed -i 's/fetcharch mips debian jessie/#fetcharch mips debian jessie/' fetchlibs.sh &&\
    sed -i 's/fetcharch mipsel debian jessie/#fetcharch mipsel debian jessie/' fetchlibs.sh &&\
    python3 setup.py build &&\
    python3 setup.py install
RUN python3 -m pip install -U pip &&\
    python3 -m pip install -U git+https://github.com/shellphish/fuzzer &&\
    python3 -m pip install -U git+https://github.com/shellphish/driller &&\
    python3 -m pip install -U git+https://github.com/angr/tracer &&\
    cp -R -v /shellphish-afl/bin/afl-unix /usr/bin/
ADD shellphuzz /usr/local/bin/shellphuzz
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 10

# fix for using empty core_pattern
RUN sed -i 's/if not "core" in f.read():/if f.read().startswith("|"):/' /usr/local/lib/python3.5/dist-packages/fuzzer/fuzzer.py