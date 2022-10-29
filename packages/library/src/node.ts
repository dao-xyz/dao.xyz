import { DynamicAccessController } from '@dao-xyz/peerbit-dynamic-access-controller';
import { Posts } from './post.js';
import { PublicSignKey } from '@dao-xyz/peerbit-crypto';
import { TrustedNetwork } from '@dao-xyz/peerbit-trusted-network'
import { Peerbit } from '@dao-xyz/peerbit';
import { LogIndex } from '@dao-xyz/peerbit-logindex';
import { DQuery } from '@dao-xyz/peerbit-query';

export const createRootPosts = (options: { id?: string, identity?: PublicSignKey } = {}): Posts => {

    const id = options.id || 'root';

    // create posts
    const posts = new Posts({ id, acl: !options.identity ? undefined : new DynamicAccessController({ id, trustedNetwork: new TrustedNetwork({ id, rootTrust: options.identity, logIndex: new LogIndex({ id, query: new DQuery({ id }) }) }) }) })

    return posts
}
export const setupRoot = async (config: { replicationTopic: string, network?: TrustedNetwork, peer: Peerbit }) => {
    let posts: Posts;
    const { network, peer, replicationTopic } = config;
    // Bootstrapping
    if (network?.rootTrust.equals(peer.identity.publicKey)) {
        // Do deterministic things
        posts = createRootPosts({ id: replicationTopic, identity: peer.identity.publicKey })
    }
    else {
        posts = createRootPosts({ id: replicationTopic, identity: network?.rootTrust })
    }

    await peer.open(posts, { replicationTopic, replicate: true }) // we open this manually (it can be done autmatically on first post also)
    while (true) {
        console.log('Posts address: ' + posts.address.toString());
        const x = () => {
            console.log("\tPosts count: " + posts.posts.index.size);
        }
        x();
        await new Promise(r => setTimeout(r, 4000));
    }
}
