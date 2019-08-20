FROM zjuchenyuan/base

LABEL description="Dockerfile for Damato"

RUN apt update && apt-get install -y git python3-pip

RUN git clone https://github.com/googleprojectzero/domato /domato
WORKDIR /domato