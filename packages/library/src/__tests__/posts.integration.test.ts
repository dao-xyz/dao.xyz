import { Peerbit } from '@dao-xyz/peerbit';
import { Session } from '@dao-xyz/peerbit-test-utils';

// @ts-ignore
import { v4 as uuid } from 'uuid';
import { createRootPosts } from '../node';
import { serialize } from '@dao-xyz/borsh';

describe('node', () => {
    let session: Session, peer: Peerbit

    beforeEach(async () => {
        session = await Session.connected(1, 'js-ipfs')
        peer = await Peerbit.create(session.peers[0].ipfs, { directory: './tmp/' + uuid(), waitForKeysTimout: 0 });


    })
    afterEach(async () => {
        try {
            await peer?.disconnect();
            await session?.stop();
        } catch (error) {

        }
    })

    it('can reproduce root', async () => {
        const ser1 = serialize(createRootPosts({ identity: peer.identity.publicKey }));
        const ser2 = serialize(createRootPosts({ identity: peer.identity.publicKey }));
        expect(ser1).toEqual(ser2);
    })
});
