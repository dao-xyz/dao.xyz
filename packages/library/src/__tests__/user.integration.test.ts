import { Session } from '@dao-xyz/peerbit-test-utils';
import http from 'http';
import { Peerbit } from '@dao-xyz/peerbit';
import { Post, Posts } from '../post';

it('_', () => { })
/* 

import { delay, waitFor } from '@dao-xyz/time';
import { createGenesis } from '../post';
import { createUsersShard, User } from '../user';
import { getPeer } from './utils';

describe('user', () => {
    test('getUserFromKey', async () => {

        const trustedRootPeer = await getPeer()
        // await peer2.node.swarm.connect((await trustedRootPeer.node.id()).addresses[0])
        const l0a = await createGenesis(trustedRootPeer);
        await l0a.init(trustedRootPeer);


        const l1Users = await createUsersShard(l0a.trust);
        await l1Users.init(trustedRootPeer);


        const l1Trust = await createTrustShard();
        await l1Trust.init(trustedRootPeer);
        const peer2 = await getPeer()

        let store = l1Users.interface.db;
        let userIdentity = PublicKey.from(peer2.orbitDB.identity);
        await store.put(new User({
            name: 'name'
        }))

        // Get user from identity directly
        let userFromIdentity = await l1Users.interface.getUserFromKey(userIdentity, l1Trust.interface)
        expect(userFromIdentity).toBeDefined();

        // Get user frmo identity with trust chain
        const l1TrustLoaded = await Shard.loadFromCID<P2PTrustChain>(l1Trust.cid, peer2.node);
        await l1TrustLoaded.init(peer2);

        let userFromAnotherTrustedIdentity = new PublicKey({
            address: 'a',
            type: 'b'
        });

        await l1TrustLoaded.interface.addTrust(userFromAnotherTrustedIdentity);
        await waitFor(() => Object.keys(l1TrustLoaded.interface.db.db.index).length > 0);
        await delay(3000);
        await waitFor(() => Object.keys(l1Trust.interface.db.db.index).length > 0);
        userFromIdentity = await l1Users.interface.getUserFromKey(userFromAnotherTrustedIdentity, l1Trust.interface)
        expect(userFromIdentity).toBeDefined();

        await disconnectPeers([trustedRootPeer, peer2]);
    })

});
 */