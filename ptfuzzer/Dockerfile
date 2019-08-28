FROM zjuchenyuan/base

RUN apt update && apt install -y python-pip libcapstone-dev msr-tools cmake sudo &&\
    pip install cle==7.8.9.26 capstone

RUN git clone https://github.com/hunter-ht-2018/ptfuzzer &&\
    cd ptfuzzer &&\
    mkdir build && cd build &&\
    cmake ../ -DPREFIX=. &&\
    make && make install

RUN sh -c "cat /sys/bus/event_source/devices/intel_pt/type; exit 0"