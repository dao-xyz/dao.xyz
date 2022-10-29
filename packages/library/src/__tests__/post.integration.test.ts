import { Peerbit } from '@dao-xyz/peerbit';
import { Post, Posts } from '../post';
import { Range } from '@dao-xyz/peerbit-string';
import { PageQueryRequest, Results, ResultWithSource } from '@dao-xyz/peerbit-anysearch';
import { Session } from '@dao-xyz/peerbit-test-utils';
import { Access, AccessType, DynamicAccessController, PublicKeyAccessCondition } from '@dao-xyz/peerbit-dynamic-access-controller';
import { waitFor } from '@dao-xyz/peerbit-time';
import { X25519PublicKey, Ed25519PublicKey } from '@dao-xyz/peerbit-crypto'
import { HeadsMessage, LogQueryRequest, LogEntryEncryptionQuery } from '@dao-xyz/peerbit-logindex';
// @ts-ignore
import { v4 as uuid } from 'uuid';
import { ProgramContent } from '../content';
import { CollaborativeText } from '../post-types';

describe('node', () => {
    let session: Session, peer: Peerbit, peer2: Peerbit, peer3: Peerbit

    beforeEach(async () => {
        session = await Session.connected(3, 'js-ipfs')
        peer = await Peerbit.create(session.peers[0].ipfs, { directory: './tmp/' + uuid(), waitForKeysTimout: 0 });
        peer2 = await Peerbit.create(session.peers[1].ipfs, { directory: './tmp/' + uuid(), waitForKeysTimout: 0 });
        peer3 = await Peerbit.create(session.peers[2].ipfs, { directory: './tmp/' + uuid(), waitForKeysTimout: 0 });

    })
    afterEach(async () => {
        try {
            await peer?.disconnect();
            await peer2?.disconnect();
            await peer3?.disconnect();
            await session?.stop();
        } catch (error) {

        }
    })

    it('can create post with 2 editors and 1 relay', async () => {
        const replicationTopic = uuid();

        // Relay
        await peer2.subscribeToReplicationTopic(replicationTopic);


        // Peer 1 initiates a "conversation"
        let posts = await peer.open(new Posts(), { replicationTopic });
        let post = new Post({ acl: new DynamicAccessController({ rootTrust: peer.identity.publicKey }), content: new CollaborativeText() }); // new DString({ search: new AnySearch({ query: new DQuery({}) }) }) 
        await posts.posts.put(post);
        post = await peer.open(post, { replicationTopic });
        await post.getContent<ProgramContent>().getProgram<CollaborativeText>().text.add("hello", new Range({ offset: 0, length: "hello".length }))

        await post.acl?.access.put(new Access({ accessTypes: [AccessType.Any], accessCondition: new PublicKeyAccessCondition({ key: peer3.identity.publicKey }) }))

        // Peer 3 lists all posts and edits
        const posts3 = await peer3.open<Posts>(posts.address, { replicate: false, replicationTopic })
        let results: Results = undefined as any;
        await posts3.posts.index.search.query(new PageQueryRequest({ queries: [] }), (r) => {
            results = r;
        }, {
            waitForAmount: 1
        });

        let postFromResult = (results.results[0] as ResultWithSource).source as Post;
        postFromResult = await peer3.open<Post>(postFromResult, { replicate: false, replicationTopic })
        await (postFromResult.getContent<ProgramContent>()).getProgram<CollaborativeText>().text.add(" world", new Range({ offset: "hello".length, length: " world".length }))



        // Peer 1 gets the change immidiately since it is replicating
        await waitFor(() => (post.getContent<ProgramContent>().getProgram<CollaborativeText>().text.store.oplog.values.length) === 2);
        expect(await (post.getContent<ProgramContent>().getProgram<CollaborativeText>().text.toString())).toEqual('hello world');
    })

    it('can create E2EE post with 2 two peers and relays', async () => {
        const replicationTopic = uuid();

        // Relay
        await peer2.subscribeToReplicationTopic(replicationTopic);

        const encryptionReaders = [peer.identity.publicKey as Ed25519PublicKey, peer3.identity.publicKey as Ed25519PublicKey];

        // Peer 1 initiates a "conversation"
        let posts = await peer.open(new Posts(), { replicationTopic });
        let post = new Post({ acl: new DynamicAccessController({ rootTrust: peer.identity.publicKey }), content: new CollaborativeText() });

        await posts.posts.put(post, { reciever: { clock: undefined, signature: encryptionReaders, payload: encryptionReaders } });

        await waitFor(() => (peer2.programs[replicationTopic][posts.address.toString()]?.program as Posts)?.posts.store.oplog.values.length === 1);

        post = await peer.open(post, { replicate: false, replicationTopic });
        await (post.getContent<ProgramContent>().getProgram<CollaborativeText>()).text.add("hello", new Range({ offset: 0, length: "hello".length }), {
            reciever: {
                payload: encryptionReaders,
                signature: encryptionReaders,
                clock: undefined,
            }
        })

        await post.acl?.access.put(new Access({ accessTypes: [AccessType.Any], accessCondition: new PublicKeyAccessCondition({ key: peer3.identity.publicKey }) }))

        await waitFor(() => (peer2.programs[replicationTopic][posts.address.toString()]?.program as Posts)?.posts.store.oplog.values.length === 1);
        // Peer 3 joins later and posts which can be red
        const posts3 = await peer3.open<Posts>(posts.address, { replicate: false, replicationTopic })

        let heads: HeadsMessage = undefined as any;
        await posts3.posts.logIndex.query.query(new LogQueryRequest({
            queries: [
                new LogEntryEncryptionQuery({ clock: [], payload: [await X25519PublicKey.from(peer3.identity.publicKey as Ed25519PublicKey)], signature: [await X25519PublicKey.from(peer3.identity.publicKey as Ed25519PublicKey)] })
            ]
        }), (r) => {
            heads = r;
        }, {
            waitForAmount: 1
        });

        expect(posts3.posts.store.oplog.values).toHaveLength(0);
        await posts3.posts.store.sync(heads.heads) // update the state of the new intel
        await waitFor(() => posts3.posts.index.size === 1);
        // manually find the new (1) posts, open, and write something 
        for (let post of posts3.posts.index._index.values()) {
            let openPost = await peer3.open<Post>(post.value, { replicate: false, replicationTopic })
            await (openPost.getContent<ProgramContent>().getProgram<CollaborativeText>()).text.add(" world", new Range({ offset: "hello".length, length: " world".length }), { reciever: { clock: undefined, signature: undefined, payload: encryptionReaders } })
        }

        // Peer 1 gets the change immidiately since it is replicating
        await waitFor(() => ((post.getContent<ProgramContent>().getProgram<CollaborativeText>()).text.store.oplog.values.length) === 2);
        const toString = await ((post.getContent<ProgramContent>().getProgram<CollaborativeText>()).text.toString());
        expect(toString).toEqual('hello world');
    })

});
