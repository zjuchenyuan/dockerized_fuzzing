FROM zjuchenyuan/base

LABEL description="Dockerfile for QSYM"

RUN mkdir /workdir && git clone https://github.com/sslab-gatech/qsym /workdir/qsym
WORKDIR /workdir/qsym
RUN apt install -yq sudo && ./setup.sh && pip install . 
