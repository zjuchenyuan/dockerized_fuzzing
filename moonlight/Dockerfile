FROM zjuchenyuan/base

RUN apt update &&\
    apt install -y cmake libboost-filesystem-dev libboost-log-dev libboost-program-options-dev libboost-regex-dev libboost-serialization-dev libboost-system-dev libboost-thread-dev &&\
    pip install -r moonlight-code/python/requirements.txt

RUN git clone https://gitlab.anu.edu.au/lunar/moonlight &&\
    cd moonlight &&\
    mkdir build && cd build &&\
    cmake ../ &&\
    make &&\
    make install
