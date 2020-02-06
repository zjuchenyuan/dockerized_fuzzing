FROM zjuchenyuan/base
RUN curl https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz|tar xJf - --strip-components 1 &&\
    npm i esprima@4.0.1 &&\
    apt update && apt install -y apt-transport-https &&\
    wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb &&\
    dpkg -i packages-microsoft-prod.deb && rm packages-microsoft-prod.deb &&\
    apt update && apt install -y dotnet-sdk-2.1 dotnet-runtime-2.1

RUN git clone https://github.com/SoftSec-KAIST/CodeAlchemist &&\
    cd CodeAlchemist &&\
    make

