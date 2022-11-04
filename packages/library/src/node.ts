import { Access, AccessType, AnyAccessCondition, DynamicAccessController, PublicKeyAccessCondition } from '@dao-xyz/peerbit-dynamic-access-controller';
import { Posts } from './post.js';
import { PublicSignKey } from '@dao-xyz/peerbit-crypto';
import { TrustedNetwork } from '@dao-xyz/peerbit-trusted-network'
import { Peerbit } from '@dao-xyz/peerbit';
import { LogIndex } from '@dao-xyz/peerbit-logindex';
import { DQuery } from '@dao-xyz/peerbit-query';
import { CID } from 'multiformats/cid';
import { startIpfs } from './ipfs.js';
import { multiaddr } from '@multiformats/multiaddr';
import { webSockets } from '@libp2p/websockets'
import { serialize } from '@dao-xyz/borsh'


export const createRootPosts = (options: { id?: string, identity?: PublicSignKey } = {}): Posts => {

    const id = options.id || 'rooty';

    // create posts
    const posts = new Posts({ id, acl: !options.identity ? undefined : new DynamicAccessController({ id, trustedNetwork: new TrustedNetwork({ id, rootTrust: options.identity, logIndex: new LogIndex({ id, query: new DQuery({ id }) }) }) }) })
    return posts
}
export const setupRoot = async (config: { replicationTopic: string, network?: TrustedNetwork, peer: Peerbit }) => {
    let root: Posts
    const { network, peer, replicationTopic } = config;
    // Bootstrapping
    if (network?.rootTrust.equals(peer.identity.publicKey)) {
        // Do deterministic things
        root = createRootPosts({ id: replicationTopic, identity: peer.identity.publicKey })
    }
    else {
        root = createRootPosts({ id: replicationTopic, identity: network?.rootTrust })
    }


    await peer.open(root, { replicationTopic, replicate: true }) // we open this manually (it can be done autmatically on first post also)

    // Allow anyone to write
    await root.acl?.access.put(new Access({
        accessCondition: new AnyAccessCondition(),
        accessTypes: [AccessType.Any]
    }))

    console.log('Posts address: ' + root.address.toString());
    /*   const blockValue = await peer.ipfs.block.get(CID.parse(root.address.cid));
     console.log("from me", blockValue)
 
     const readerNode = await startIpfs('js', {
         ipfsOptions: {
             relay: { enabled: false, hop: { enabled: false, active: false } },
             preload: { enabled: false },
             EXPERIMENTAL: { ipnsPubsub: false, "pubsub": true } as any,
             config: {
                 Bootstrap: [],
                 Addresses: {
                     Swarm: []
                 },
                 Discovery: {
                     MDNS: { Enabled: false },
                     webRTCStar: { Enabled: false },
                 },
             },
             repo: 'repo-xx',
             libp2p: {
                 connectionManager: {
                     autoDial: false
                 },
             }
         },
         module: {
 
             disposable: true
         }
     });
     const addresses = (await peer.ipfs.id()).addresses
     for (const address of addresses) {
 
         // if (address.toString().indexOf('/ws') !== -1 && address.toString().indexOf('/wss') !== -1) 
         {
             await readerNode.api.swarm.connect(multiaddr(address))
 
         }
 
} 
   const blockGet = await readerNode.api.block.get(CID.parse(root.posts.address.cid));
   const lx = await Posts.load(readerNode.api, root.posts.address)
   console.log('block get from another peer', blockGet)*/
    console.log('Relation graphs index address: ' + root.acl?.identityGraphController.address.toString());
    while (true) {
        const x = () => {
            console.log("\tPosts count: " + root.posts.index.size);
        }
        x();
        await new Promise(r => setTimeout(r, 4000));
    }
}
