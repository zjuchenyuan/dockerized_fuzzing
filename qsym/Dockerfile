FROM zjuchenyuan/base

LABEL description="Dockerfile for QSYM"

RUN mkdir /workdir && git clone https://github.com/sslab-gatech/qsym /workdir/qsym
WORKDIR /workdir/qsym
RUN apt install -yq sudo && \
    sed -i '23,25 s/^/#/' setup.py && sed -i '4,7 s/^/#/' setup.sh && \
    ./setup.sh && pip install . 
COPY --from=zjuchenyuan/afl /afl /
