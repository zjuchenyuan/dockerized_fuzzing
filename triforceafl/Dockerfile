FROM zjuchenyuan/base

ENV K kern


RUN sed -i 's/# deb-src/deb-src/g' /etc/apt/sources.list &&\
    apt update &&\
    apt-get -y build-dep qemu &&\
    apt install -y build-essential curl git libtool-bin wget automake bison linux-image-$(uname -r)

RUN git clone https://github.com/nccgroup/TriforceAFL.git && \
    cd TriforceAFL && make

RUN git clone https://github.com/nccgroup/TriforceLinuxSyscallFuzzer.git && \
    ( cd TriforceLinuxSyscallFuzzer && \
      make && \
      mkdir kern && \
      cp /boot/vmlinuz* kern/bzImage && \
      cp /boot/System.map* kern/kallsyms && \
      make inputs )
