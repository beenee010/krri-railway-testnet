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
```