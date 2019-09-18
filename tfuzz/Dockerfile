FROM zjuchenyuan/base

LABEL description="T-Fuzz: fuzzing by program transformation"

RUN sed -i 's/# deb-src/deb-src/g' /etc/apt/sources.list &&\
    apt-get update && apt-get build-dep -y qemu-system && apt install -y libtool libtool-bin git build-essential gcc-multilib libtool automake autoconf bison debootstrap debian-archive-keyring libacl1-dev  python-pip python-virtualenv

RUN git clone https://github.com/radare/radare2.git &&\
    cd radare2 && ./sys/install.sh && cd .. 

# we ignore qemu install, as T-Fuzz will not use it
RUN git clone https://github.com/shellphish/shellphish-afl.git &&\
    cd shellphish-afl &&\
    #sed -i 's/self.execute(_setup_cgc/#self.execute(_setup_cgc/g' setup.py && sed -i 's/self.execute(_setup_other_arch/#self.execute(_setup_other_arch/g' setup.py &&\
    #python setup.py build &&\
    python setup.py install &&\
    #cp -R /usr/local/bin/afl-unix /usr/bin/ &&\
    git clone --depth 1 https://github.com/mirrorer/afl /usr/bin/afl-unix &&\
    cd /usr/bin/afl-unix && make

# fix Deprecation Warning issue, here we use latest version of shellphish/fuzzer
# it seems pip of base image is somewhat wierd, need to reinstall pip
RUN python -m pip uninstall -y pip &&\
    apt install --reinstall -y python-pip &&\
    python -m pip install -U pip &&\
    git clone https://github.com/HexHive/T-Fuzz &&\
    cd T-Fuzz && sed -i 's/shellphish-afl==1.1//g' req.txt &&\
    pip install -r req.txt &&\
    pip install -U git+https://github.com/shellphish/fuzzer.git

# there are an issue related to number format of create_dict.py
ADD create_dict.py /usr/local/bin/create_dict.py

RUN chmod +x /usr/local/bin/create_dict.py