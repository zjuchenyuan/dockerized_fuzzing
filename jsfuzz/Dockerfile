FROM zjuchenyuan/base
RUN curl https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz|tar xJf - --strip-components 1
RUN git clone https://github.com/fuzzitdev/jsfuzz &&\
    cd jsfuzz && npm install && npm install -g typescript @types/node &&\
    npm run-script build &&\
    chmod +x build/src/index.js

RUN cd /jsfuzz && npm install jpeg-js@0.3.6

# Usage: docker run -it zjuchenyuan/jsfuzz /jsfuzz/build/src/index.js /jsfuzz/examples/jpeg/fuzz.js