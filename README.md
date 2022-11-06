<br>
<p align="center">
    <img width="200" src="./logo.png"  alt="logo">
</p>
<h3 align="center">
   Communication app with flexibility and privacy
</h3>
<br>


DAO.xyz is creating a communications app where we rethink first principles of digital communication, whether that is 1-to-1, 1-to-many and many-to-many. This includes private messaging, social media, news, wikis etc.

Alongside this we're deploying these novel experiments on a decentralized backend that is ready to scale, where you can self-host, group-host or delegate-host with state-of-the-art E2E encryption.

The short-term roadmap is to create a better conversations-application, such as Signal/Telegram/Messenger. We see there being many low-hanging fruits there, both in the user-experience and in the privacy realm.

Thereafter we'll launch a knowledge-management interface where users can interact with structured data whether that data emerge from conversations with others, brainstorm sessions, meetings, digital reading history or data previously entered in another structure.

The long-term goal is to create a social knowledge graph where users can score each other and others claims on truthfulness, usefulness and agree on shared values. The goal is to lay the foundation for digital discussions to act as institutions.

#
# 🚧 WIP 🚧 


## How it works

The database setup is very simple we have 

[Posts](./packages/library/src/post.ts)

which allows you to have a document databases of ```Post``` 


[Post](./packages/library/src/post.ts) (the second class)

is the post container. Which can either have static or dynamic content (subdatabases)

[CollaborativeText](./packages/library/src/post-types.ts)

Is a subdatabase you can put in a post. This post type allows multiple peers edit a post together

All databases support optional ACL layer (see databases above for reference). 


Any peer can open any of these databases and make changes. Changes are propagating through you the network and are respected if you are complient with ACL settings of other peers. I.e. you can "always" write locally but changes might not be absorbed by peers.

## Features
- Dynamic post format: Post can contain "subprograms" which can be extend to any post type. For now there are just two post types: 
"CollaborativeText" (A text document you can edit together) and "NetworkPost" (that allows you to share your IPFS Id info)
- E2EE: Because if this project relies on Peerbit, we can write E2EE encrypted messages. 
- Can be used with any wallet. The only things you need to integrate the wallet to let use read the public key and sign messages. As of now it support ```Metamask``` but could easily be (and will) be integrated with ```WalletConnect```

## Proof of things that is working.

Clone this repo 

and run 
```sh 
yarn install
yarn test
```

and you will run multiple integration tests. Most importantly [post logic tests](./packages/library/src/__tests__/post.integration.test.ts) that does the following. 

Both tests checks whether one peer can create a post and send it unencrypted or encrypted to another peer. The second peer edits the post (and is allowed to because of ACL layer (which itself is another database)). The first peer will then instantly get update of the edits. In the encrypted test, the relay does not know anything about the contents of the posts, yet allow peers to search in the Log for metadata.


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
npm install -g daoxyz
```

Documentation
```sh
daoxyz --help
```

### Example
Replicate (relay) "world topic" behind a subdomain

(might need sudo because it will install Docker if missing 🤫)
```sh
daoxyz domain create --email YOUR_EMAIL
```

Start node
```
daoxyz start --topic world
```


