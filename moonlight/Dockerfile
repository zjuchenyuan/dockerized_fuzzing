FROM zjuchenyuan/base

RUN apt update &&\
    apt install -y cmake libboost-filesystem-dev libboost-log-dev libboost-program-options-dev libboost-regex-dev libboost-serialization-dev libboost-system-dev libboost-thread-dev

RUN git clone https://gitlab.anu.edu.au/lunar/moonlight &&\
    cd moonlight &&\
    pip install -r python/requirements.txt &&\
    mkdir build && cd build &&\
    cmake ../ &&\
    make &&\
    make install

RUN cd moonlight/data &&\
    tar xf png.tar.xz &&\
    moonlight -d png -mm matrix_png.matrix -n png1