FROM zjuchenyuan/base

RUN git clone https://github.com/mozilla/gecko-dev --depth 1

# Credit: https://github.com/google/oss-fuzz/blob/master/projects/spidermonkey/build.sh

ENV SHELL=/bin/bash
RUN apt update && cd /gecko-dev && ./mach bootstrap --no-interactive --application-choice browser

RUN cd /gecko-dev && curl https://raw.githubusercontent.com/zjuchenyuan/dockerized_fuzzing/master/fuzzilli/mozbuild.patch | patch -p1 &&\
    mkdir -p /gecko-dev/js/src/build_OPT.OBJ &&\
    cd /gecko-dev/js/src && autoconf2.13 &&\
    cd /gecko-dev/js/src/build_OPT.OBJ &&\
    ../configure --enable-debug --enable-optimize --disable-shared-js &&\
    make -j4

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA6932366A755776 &&\
    echo "deb http://ppa.launchpad.net/deadsnakes/ppa/ubuntu xenial main" > /etc/apt/sources.list.d/python.list &&\
    apt update && apt install -y python3.7-dev &&\
    update-alternatives --install /usr/bin/python python /usr/bin/python3.7 50 &&\
    curl https://bootstrap.pypa.io/get-pip.py | python

RUN git clone https://github.com/MozillaSecurity/funfuzz && cd funfuzz &&\
    pip install -U setuptools &&\
    pip install -U -r requirements.txt &&\
    python setup.py install

ADD js.fuzzmanagerconf /gecko-dev/js/src/build_OPT.OBJ/dist/bin/