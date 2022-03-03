FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
ARG uid=1000

WORKDIR /home/ether

# Install environment
RUN apt-get update
# RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
# RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BD33704C
# RUN apt-get install -y python-software-properties
# RUN apt-get install -y software-properties-common
# RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y vim
RUN apt-get update -y && apt-get install -y \
        git \
        wget \
        build-essential \
        libgmp3-dev \
        net-tools
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:longsleep/golang-backports
RUN apt update
RUN apt install -y golang-go
RUN git clone https://github.com/ethereum/go-ethereum.git
WORKDIR /home/ether/go-ethereum
RUN cd /home/ether/go-ethereum

RUN make geth
RUN cp build/bin/geth /usr/local/bin/

WORKDIR /home/DATA_STORE/node
COPY ./genesis.json /home/DATA_STORE/node
COPY ./password.txt /home/DATA_STORE/node

# Adding repositories and keys

RUN apt-get update -y
RUN geth --datadir /home/DATA_STORE/node init genesis.json
# RUN geth --datadir /home/DATA_STORE/node account new --password ./password.txt
