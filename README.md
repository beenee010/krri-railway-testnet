# krri-railway-testnet
## KRRI Railway Simulation - Ethereum Testnet

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

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node1 --http.port 8545 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30305 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0x33b92cca8b667B524Dc40454706978d3A4CE7f84' --password ./password.txt --mine console



node2 - 686dbaa7ef1a
Public address of the key:   0xA045BE99bfc0E76E8eAA2Dc5c8F466CE192B4418
Path of the secret key file: node2/keystore/UTC--2022-02-07T08-19-37.540110100Z--a045be99bfc0e76e8eaa2dc5c8f466ce192b4418

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node2 --http.port 8546 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30306 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0xA045BE99bfc0E76E8eAA2Dc5c8F466CE192B4418' --password ./password.txt --mine console


node3
Public address of the key:   0xdcA71aef5Ca11870B1f594D1017a070db783f977
Path of the secret key file: node3/keystore/UTC--2022-02-07T15-58-34.138245400Z--dca71aef5ca11870b1f594d1017a070db783f977

geth --networkid 7881 --syncmode 'full' --maxpeers 10 --datadir /home/DATA_STORE/node3 --http.port 8547 --http.addr "0.0.0.0" --http.corsdomain "*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --port 30307 --bootnodes 'enode://a22832ca022e71e86f626764a247a25e233833ba7c360a1fd8a064092929b4a2446e3c81661d51fab5cc3d9743615340cb767b0b7815087307c2fcb0766c58a5@172.20.0.5:30308' --unlock '0xdcA71aef5Ca11870B1f594D1017a070db783f977' --password ./password.txt --mine console

```

### Network Structure
172.20.0.3:8750 - node1
172.20.0.4:8751 - node2
172.20.0.5:8752 - node3
...
