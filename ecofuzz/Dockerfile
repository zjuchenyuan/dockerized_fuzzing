FROM zjuchenyuan/base
RUN git clone https://github.com/MoonLight-SteinsGate/EcoFuzz e &&\
    mv /e/EcoFuzz / &&\
    cd /EcoFuzz && make && make install &&\
    cd llvm_mode && make

ENV CC=/EcoFuzz/afl-gcc CXX=/EcoFuzz/afl-g++