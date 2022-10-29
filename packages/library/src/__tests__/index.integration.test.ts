import { Session } from '@dao-xyz/peerbit-test-utils';

describe('integration', () => {
    let session: Session;

    beforeAll(async () => {
        session = await Session.connected(1);
    })
    afterAll(async () => {
        await session.stop();
    })
    it('_', () => { })

    /*     describe('post', () => {
            test('are unique', async () => {
                const peer = await getPeer();
                const l0a = await createPostShard(new TextContent());
                await l0a.init(peer);
                await l0a.load();
                const l0b = await createPostShard(new TextContent(), l0a.trust);
                await l0b.init(peer);
                await l0b.load();
                expect(l0a.cid).not.toEqual(l0b.cid);
    
                expect(l0a.interface.comments.db.address).not.toEqual(l0b.interface.comments.db.address);
                expect((l0a.interface.content as TextContent).db.address).not.toEqual((l0b.interface.content as TextContent).db.address);
            })
        }); */

    /* describe('acl', () => {

        test('default root vibe access', async () => {
            const trustedRootPeer = await getPeer();
            const peer = await getPeer(undefined, false);
            await connectPeers(trustedRootPeer, peer);

            const l0a = await createGenesis(trustedRootPeer);
            await l0a.replicate(trustedRootPeer);
            await l0a.interface.load();
            await Shard.subscribeForReplication(trustedRootPeer, l0a.trust)
            await l0a.trust.addTrust(peer.orbitDB.identity);
            //   const l0ax = await Shard.loadFromCID<PostInterface>(l0a.cid, trustedRootPeer.node);

            await delay(3000);
            const l1 = await createPostShard(new TextContent(), l0a.trust);
            await l1.init(peer, l0a.cid);
            await l1.requestReplicate();
            let store = (l1.interface.content as TextContent);
            await store.load();
            await store.write(x => store.db.add(x, { offset: 0 }), 'xyz')

            const l0b = await Shard.loadFromCID<PostInterface>(l0a.cid, peer.node);
            await l0b.init(peer);
            await l0b.load();
            await l0b.interface.comments.write((x) => l0b.interface.comments.db.put(x), l1);
            await delay(5000);
            let comment = undefined;
            //await l0b.interface.comments.db.load();
            await l0b.interface.comments.db.query(new QueryRequestV0({
                type: new DocumentQueryRequest({
                    queries: []
                })
            }), (x) => { comment = (x.results[0] as ResultWithSource).source }, 1, 10000)
            let textDB = (comment.interface.content as TextContent);
            expect(!textDB.initialized)
            await textDB.init(l1.peer.orbitDB, l1.defaultStoreOptions);
            await textDB.load();
            expect(textDB.initialized)
            let text = undefined;
            await textDB.toStringRemote((s) => (text = s), 3000);
            expect(text).toEqual('xyz');
        })

    }) */

});
