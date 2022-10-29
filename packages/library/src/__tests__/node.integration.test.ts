import { Peerbit } from '@dao-xyz/peerbit';
import { Post, Posts } from '../post';
import { Range } from '@dao-xyz/peerbit-string';
import { waitFor } from '@dao-xyz/peerbit-time';
import { Session } from '@dao-xyz/peerbit-test-utils';
import { ProgramContent } from '../content';
import { CollaborativeText } from '../post-types';
describe('node', () => {
    let session: Session, peer: Peerbit, peer2: Peerbit

    beforeAll(async () => {
        session = await Session.connected(2, 'js-ipfs')
        peer = await Peerbit.create(session.peers[0].ipfs);
        peer2 = await Peerbit.create(session.peers[1].ipfs);

    })
    afterAll(async () => {
        await peer?.disconnect();
        await peer2?.disconnect();
        await session?.stop();
    })

    it('can restart and load data', async () => {
        const replicationTopic = 'abc';
        await peer2.subscribeToReplicationTopic(replicationTopic);
        let posts = await peer.open(new Posts(), { replicationTopic });
        const post = new Post({ content: new CollaborativeText() });
        await posts.posts.put(post);
        await peer.open(post, { replicationTopic });
        await (post.getContent<ProgramContent>().getProgram<CollaborativeText>()).text.add("hello world", new Range({ offset: 0, length: "hello world".length }))
        await waitFor(() => Object.keys(peer2.programs[replicationTopic]).length === 2)
        await peer.disconnect();
        peer = await Peerbit.create(session.peers[0].ipfs);
        posts = await peer.open<Posts>(posts.address);
        await posts.posts.store.load();
        await waitFor(() => posts.posts.index.size === 1)
    })
});
