FROM zjuchenyuan/base

LABEL description="dharma: Generation-based, context-free grammar fuzzer"

RUN apt update && apt install -y git python3-pip && \
    python3 -m pip install -U pip setuptools

RUN git clone https://github.com/MozillaSecurity/dharma /dharma &&\
    cd /dharma &&\
    python3 setup.py install

WORKDIR /dharma