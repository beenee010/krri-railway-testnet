# krri-railway-testnet
## KRRI Railway Simulation - Ethereum Testnet

### dApp
```
npx create-next-app [project-name]

yarn add ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client@50.1.2 axios

yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p
```

### Dockerfile
```
도커파일을 활용하여 도커 up 자동화
```

### genesis.json
```
이더리움 네트워크 설정
```

### Traffic Control (tc)
!you must use '--cap-add=NET_ADMIN' command when you run your docker image(container).
```
apt update

apt install -y iproute2 iputils-ping net-tools iperf

ping [ip-address]
```
```
// 네트워크 딜레이 생성
tc qdisc add dev eth0 root netem delay 100ms
    (
        qdisc: modify the scheduler (aka queuing discipline)
        add: add a new rule
        dev enp4s0: rules will be applied on device enp4s0
        root: modify the outbound traffic scheduler (aka known as the egress qdisc)
        netem: use the network emulator to emulate a WAN property
        delay: the network property that is modified
        200ms: introduce delay of 200 ms
    )
tc qdisc del dev eth0 root // 룰 삭제 명령어
```
```
server$ iperf -s
client$ iperf -c [server-ip]

tc class add dev eth0 parent 1:1 classid 1:11 htb rate 20mbit // (커널 오류) 20mbit 외에 설정 가능

tc qdisc add dev eth0 handle 1: ingress
tc filter add dev eth0 parent 1: protocol ip prio 50 u32 match ip src 0.0.0.0/0 police rate 1mbit burst 10k drop flowid :1
tc qdisc add dev eth0 root tbf rate 1mbit latency 25ms burst 10k`

```
### Netcat (nc)
```
apt install -y netcat

client$ nc -vl 44444 > test-file.txt
server$ nc -N 192.168.0.103 44444 < /home/DATA_STORE/test-transfer.txt
```

### node info
```
password: 1234

bootnode - 7db2d0b8e273
--bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@127.0.0.1:0?discport=30308'

node1 - c62632bc0b47
Public address of the key:   0x33b92cca8b667B524Dc40454706978d3A4CE7f84
Path of the secret key file: node1/keystore/UTC--2022-02-07T08-17-30.999717800Z--33b92cca8b667b524dc40454706978d3a4ce7f84

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node1 --http.port 8546 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30306 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0x33b92cca8b667B524Dc40454706978d3A4CE7f84' --password ./password.txt --mine console



node2 - 686dbaa7ef1a
Public address of the key:   0xA045BE99bfc0E76E8eAA2Dc5c8F466CE192B4418
Path of the secret key file: node2/keystore/UTC--2022-02-07T08-19-37.540110100Z--a045be99bfc0e76e8eaa2dc5c8f466ce192b4418

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node2 --http.port 8545 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30305 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0xA045BE99bfc0E76E8eAA2Dc5c8F466CE192B4418' --password ./password.txt --mine console


node3
Public address of the key:   0xdcA71aef5Ca11870B1f594D1017a070db783f977
Path of the secret key file: node3/keystore/UTC--2022-02-07T15-58-34.138245400Z--dca71aef5ca11870b1f594d1017a070db783f977

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node3 --http.port 8547 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0xdcA71aef5Ca11870B1f594D1017a070db783f977' --password ./password.txt --mine console

```

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node3 --http --http.port 8547 --http.addr "172.20.0.3" --http.corsdomain "http://krritest.io" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0xdcA71aef5Ca11870B1f594D1017a070db783f977' --password ./password.txt --allow-insecure-unlock --mine console

```
client-node1

Public address of the key:   0xA11D8C475181a2595932f54420c8220Cc9FF01AD
Path of the secret key file: client-node1/keystore/UTC--2022-02-21T07-22-10.931605000Z--a11d8c475181a2595932f54420c8220cc9ff01ad

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node3 --http --http.port 8547 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://25d382145db64afcb17a1f0a25be2be0a571cdd9859a7db61a98fd068ed636d2d39c2414c0d76dc9a5ccc07fb9b4972cf12ddd8e8d657d181194a29a0e8a1583@172.25.0.3:30301' --unlock '0x7fFBbC81c89Db8f29725445C3cb749B7295a0ac4' --password ./password.txt --allow-insecure-unlock --mine console
```

web3.eth.sendTransaction({from: "0x7fFBbC81c89Db8f29725445C3cb749B7295a0ac4",to: "0x3eA911E59587e8056449617b788C3d019F86C9C9",value: web3.toWei(3, "ether")})


### docker
enode://25d382145db64afcb17a1f0a25be2be0a571cdd9859a7db61a98fd068ed636d2d39c2414c0d76dc9a5ccc07fb9b4972cf12ddd8e8d657d181194a29a0e8a1583@127.0.0.1:0?discport=30301

### Network Structure
172.20.0.3:8750 - node1
172.20.0.4:8751 - node2
172.20.0.5:8752 - node3
...


## KRRI-Testnet
```
Grafana : http://web3examples.com/ethereum/demo/Geth_Prometheus_Grafana.html
Metamask : http://localhost:8545 || http://127.0.0.1:8545
Docker Monitoring : https://grafana.com/grafana/dashboards/893

docker run -it -d -p 9090:9090 -e "GETH="http://mygethserverhere.com:8545" hunterlong/gethexporter

bootnode
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install bootnode


node1 : 0x152A93AA79c063a092444cd8b8c2d025709Ee72d

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node1 --http --http.port 8545 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30305 --bootnodes 'enode://f8475dbe03fcbe45b8caec1f69550dbcfd3db670213fab03f9bc417fba389cd38d7b7fdcd0e135f1afdb357f26c345ea0a8a78ed1ad4562c0d2929fa53b95d1c@172.27.0.3:30301' --unlock '0x152A93AA79c063a092444cd8b8c2d025709Ee72d' --password ./password.txt --allow-insecure-unlock --ethstats node1:KRRITEST@localhost:8545 console



node2 : 4AC2137beCB8e56F451Af8a63726BF56C62F855d

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node2 --http --http.port 8546 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30306 --bootnodes 'enode://f8475dbe03fcbe45b8caec1f69550dbcfd3db670213fab03f9bc417fba389cd38d7b7fdcd0e135f1afdb357f26c345ea0a8a78ed1ad4562c0d2929fa53b95d1c@172.27.0.3:30301' --unlock '0x4AC2137beCB8e56F451Af8a63726BF56C62F855d' --password ./password.txt --allow-insecure-unlock --ethstats node2:KRRITEST@localhost:3006 console



node3 : 0xF871bf70442Bb021376e4C208657d069C43707A6

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node3 --http --http.port 8547 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://f8475dbe03fcbe45b8caec1f69550dbcfd3db670213fab03f9bc417fba389cd38d7b7fdcd0e135f1afdb357f26c345ea0a8a78ed1ad4562c0d2929fa53b95d1c@172.27.0.3:30301' --unlock '0xF871bf70442Bb021376e4C208657d069C43707A6' --password ./password.txt --allow-insecure-unlock --ethstats node3:KRRITEST@localhost:3007 console


grafana-node : 0x69E14425722AaAE02D62d602CFEB45EC8cba5714

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /Users/been/krri-geth/grafana-node --http --http.port 8540 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30300 --bootnodes 'enode://f8475dbe03fcbe45b8caec1f69550dbcfd3db670213fab03f9bc417fba389cd38d7b7fdcd0e135f1afdb357f26c345ea0a8a78ed1ad4562c0d2929fa53b95d1c@localhost:30301' --unlock '0x69E14425722AaAE02D62d602CFEB45EC8cba5714' --password ./password.txt --allow-insecure-unlock console
```


## Lab
```
node1 : 0x62e0dCdf086999Dd6709d4EEA938A3cfdC2435B6

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node --http --http.port 8545 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30305 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@172.19.0.5:30301' --unlock '0x62e0dCdf086999Dd6709d4EEA938A3cfdC2435B6' --password ./password.txt --allow-insecure-unlock --ethstats node1:KRRITEST@localhost:8545 --pprof --metrics --metrics.expensive console



node2 : 0x0E09900d7a5c7b7b0D116FDb7E02B32044AE099a

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node --http --http.port 8546 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30306 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@172.19.0.5:30301' --unlock '0x0E09900d7a5c7b7b0D116FDb7E02B32044AE099a' --password ./password.txt --allow-insecure-unlock --ethstats node2:KRRITEST@localhost:3006 console



node3 : 0x41654888d1B86B0ab8A8d1F079c2cEabF3682a5D

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node --http --http.port 8547 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@172.19.0.5:30301' --unlock '0x41654888d1B86B0ab8A8d1F079c2cEabF3682a5D' --password ./password.txt --allow-insecure-unlock --ethstats node3:KRRITEST@localhost:3007 console


grafana-node : 0x4b785f83c16afb2af17911270774bb1bdc09e68d

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir C:\Users\beenie\krri-testnet --http --http.port 8080 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30300 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@localhost:30301' --unlock '0x4b785f83c16afb2af17911270774bb1bdc09e68d' --password ./password.txt --allow-insecure-unlock --pprof --metrics --metrics.expensive console

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir C:\Users\beenie\krri-testnet --rpc --rpcport 8080 --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30300 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@127.0.0.1:30301' --unlock '0x4b785f83c16afb2af17911270774bb1bdc09e68d' --password ./password.txt --pprof --metrics console



0xE56AC068230094b83a860c0825BFD81E5b4aeA38

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/been/krri-test/ --http --http.port 8081 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30300 --bootnodes 'enode://6ffb229eb46458e8bb2c94f6b62aef14bf570887f6d0b2ca1a45357a653c8448f567cfb1ff8586e369369e509b10a36798697c1d78ccb0c86d1603ebba30d35b@localhost:30301' --unlock '0xE56AC068230094b83a860c0825BFD81E5b4aeA38' --password ./password.txt --allow-insecure-unlock --ethstats grafana:KRRITEST@localhost:8081 --pprof --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "password" console




enode://a4d9cbaed9971f915502bd488c732abc30fcb14374bafa1d714e31322ed90b83141beb1aee7b15252f80232c8e61a52eec6f208e45799fe6a0e7a063a27beaa9@127.0.0.1:30305

enode://a94e55bd4393a73fbe23619c263777ac47e09e7bbda4f7c67dfdab353ff11f4c206e03bdb192cc1ba41e906da2acd3e6a139a75aeefcec1c12e51fd56d05e9bc@127.0.0.1:30306

enode://5828a70a5a202bfc3f7536d431671424168e12b0e687dcfd7979539577646b0885016f265efd9f170c51325582017c7b4040a1d3faca34dc98c99cbbc21137de@127.0.0.1:30307

```