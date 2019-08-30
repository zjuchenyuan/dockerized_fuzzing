FROM zjuchenyuan/aflgo

RUN apt install -y libbz2-dev liblzo2-dev

ENV SUBJECT=/lrzip-CVE-2018-11496 \
    TMP_DIR=/lrzip-CVE-2018-11496/obj-aflgo/temp \
    CC=/aflgo/afl-clang-fast \
    CXX=/aflgo/afl-clang-fast++ \
    LDFLAGS=-lpthread \
    ADDITIONAL="-targets=/lrzip-CVE-2018-11496/obj-aflgo/temp/BBtargets.txt -outdir=/lrzip-CVE-2018-11496/obj-aflgo/temp -flto -fuse-ld=gold -Wl,-plugin-opt=save-temps"

RUN git clone https://github.com/ckolivas/lrzip.git lrzip-CVE-2018-11496 &&\
    cd lrzip-CVE-2018-11496 && git checkout ed51e14 &&\
    mkdir -p $TMP_DIR &&\
    cd $SUBJECT &&\
    sh -c "echo 'stream.c:1756' > $TMP_DIR/BBtargets.txt" &&\
    ./autogen.sh && make distclean &&\
    cd obj-aflgo && sh -c 'CFLAGS="$ADDITIONAL" CXXFLAGS="$ADDITIONAL" ../configure --prefix=`pwd`' &&\
    make -j4 &&\
    sh -c 'cat $TMP_DIR/BBnames.txt | rev | cut -d: -f2- | rev | sort | uniq > $TMP_DIR/BBnames2.txt && mv $TMP_DIR/BBnames2.txt $TMP_DIR/BBnames.txt; cat $TMP_DIR/BBcalls.txt | sort | uniq > $TMP_DIR/BBcalls2.txt && mv $TMP_DIR/BBcalls2.txt $TMP_DIR/BBcalls.txt; $AFLGO/scripts/genDistance.sh $SUBJECT $TMP_DIR lrzip'

RUN cd $SUBJECT/obj-aflgo &&\
    sh -c 'CFLAGS="-distance=$TMP_DIR/distance.cfg.txt" CXXFLAGS="-distance=$TMP_DIR/distance.cfg.txt" ../configure --prefix=`pwd`' &&\
    make clean && make -j4 

