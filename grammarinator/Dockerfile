FROM zjuchenyuan/base

RUN apt update && apt install -y default-jre python3-pip &&\
    git clone https://github.com/renatahodovan/grammarinator && cd grammarinator &&\
    python3 setup.py install
