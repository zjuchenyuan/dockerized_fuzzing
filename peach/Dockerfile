FROM zjuchenyuan/base

RUN apt update && apt install -y libxml2-dev libxslt1-dev lib32z1-dev &&\
    git clone https://github.com/MozillaSecurity/peach &&\
    cd peach &&\
    git clone --depth 1 https://github.com/mozillasecurity/fuzzdata &&\
    pip install -r requirements.txt

