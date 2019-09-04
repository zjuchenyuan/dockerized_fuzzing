FROM zjuchenyuan/base

RUN sed -i 's/# deb-src/deb-src/g' /etc/apt/sources.list &&\
    apt-get update && apt-get build-dep -y qemu-system && apt install -y libtool libtool-bin git build-essential gcc-multilib libtool automake autoconf bison debootstrap debian-archive-keyring libacl1-dev  python-pip python-virtualenv

RUN pip install -U git+https://github.com/shellphish/shellphish-afl
RUN pip install -U git+https://github.com/shellphish/fuzzer
RUN pip install -U git+https://github.com/shellphish/driller 

ADD shellphuzz /usr/local/bin/shellphuzz