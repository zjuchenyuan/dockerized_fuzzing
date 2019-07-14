FROM zjuchenyuan/base

LABEL description="Dockerfile for QSYM"

RUN mkdir /workdir && git clone https://github.com/sslab-gatech/qsym /workdir/qsym
WORKDIR /workdir/qsym
RUN sh -c "echo 0|tee /proc/sys/kernel/yama/ptrace_scope" && \
    apt install -yq sudo && \
    sed -i '23,25 s/^/#/' setup.py && sed -i '6 s/^/#/' setup.sh && \
    ./setup.sh && pip install . 
