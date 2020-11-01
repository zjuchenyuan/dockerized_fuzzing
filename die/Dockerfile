FROM zjuchenyuan/base
RUN apt update && apt install -y npm redis-server clang-6.0 libunwind8-dev git build-essential cmake clang libicu-dev tmux &&\
    npm install -g n && n stable
RUN git clone https://github.com/sslab-gatech/DIE &&\
    cd /DIE &&\
    ./compile.sh &&\
    git clone https://github.com/sslab-gatech/DIE-corpus.git &&\
    sed -i 's/n_cpu = multiprocessing.cpu_count() - 4/n_cpu = multiprocessing.cpu_count()/' ./fuzz/scripts/make_initial_corpus.py &&\
    python3 ./fuzz/scripts/make_initial_corpus.py ./DIE-corpus ./corpus

# build ChakraCore using AFL
RUN cd /DIE/fuzz/afl/llvm_mode &&  make &&\
    cd /DIE/engines && ./download-engine.sh ch 1.11.5 &&\
    ./build-ch-cov.sh 1.11.5

# to support Docker image building, we have to remove tmux command
# remember to save the redis database after running the populate script
# TODO: performance, currently this patch is making the populate process single threaded
ADD notmux.patch /tmp/
RUN sed -i 's/port 6379/port 9000/' /etc/redis/redis.conf &&\
    sed -i 's/appendonly no/appendonly yes/' /etc/redis/redis.conf &&\
    cd /DIE && patch -p0</tmp/notmux.patch &&\
    service redis-server start &&\
    sleep 2 &&\
    ./fuzz/scripts/populate.sh engines/chakracore-1.11.5/out/Debug/ch ./DIE-corpus ch &&\
    sleep 2 &&\
    redis-cli -p 9000 save &&\
    patch -R -p0</tmp/notmux.patch

COPY --from=andreburgaud/d8 /v8/d8 /home/soyeon/jsfuzz/js-static/engines/v8-latest/v8/out/Release/d8
RUN npm install -g typescript ts-node
# this step is to profile type information, actually this is unnecessary for DIE-corpus
#RUN cd /DIE/fuzz/TS/typer && python3 typer.py /DIE/DIE-corpus

RUN sed -i 's/multiprocessing.cpu_count() - 4/multiprocessing.cpu_count()/' /DIE/fuzz/scripts/run-all.py &&\
    ln /DIE/engines/chakracore-1.11.5/out/Debug/ch /root/ch
WORKDIR /DIE