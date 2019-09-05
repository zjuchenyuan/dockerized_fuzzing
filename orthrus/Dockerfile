FROM zjuchenyuan/base

RUN apt update && apt install -y clang-3.8 libclang-common-3.8-dev llvm-3.8-runtime llvm-3.8 lcov coreutils automake python3-pip gdb ninja-build python-pip &&\
    update-alternatives --install /usr/bin/clang clang /usr/bin/clang-3.8 50 &&\
    update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-3.8 50

RUN git clone https://github.com/test-pipeline/orthrus &&\
    cd orthrus &&\
    ./install_deps.sh

RUN python3 -c 'import exploitable; x=open("/root/.gdbinit", "r").read().replace("/usr/lib/python3.4/site-packages/exploitable-1.32_rcor-py3.4.egg/exploitable/exploitable.py", str(exploitable).split(chr(0x27))[3].replace("__init__.py","exploitable.py")); open("/root/.gdbinit", "w").write(x)' &&\
    sed -i "s#'-lgcov'#'-lgcov --coverage'#g" /orthrus/builder/builder.py &&\
    cd /orthrus && python setup.py install

ENV PATH=/root/local/bin:$PATH

RUN orthrus validate