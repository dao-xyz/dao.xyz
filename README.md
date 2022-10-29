# 🍐2🍐
P2P messaging app for fruitful conversations





## Run a node 
Needs port forwarding on 80, 443 (for the console/frontend) and 4002 (for IPFS)

[Install node version > v.16.15](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

(E.g. Ubuntu 19)  
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```


then install the CLI
```
npm install -g pear2pear
```

Documentation
```sh
pear2pear --help
```

### Example
Replicate (relay) "world topic" behind a subdomain

(might need sudo because it will install Docker if missing 🤫)
```sh
pear2pear domain create --email YOUR_EMAIL
```

Start node
```
pear2pear start --topic world
```