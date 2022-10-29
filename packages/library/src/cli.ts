import { cli as nodeCli } from '@dao-xyz/peerbit-node';
import { setupRoot } from './node.js';

export const cli = async () => {
    await nodeCli({ onStart: (config) => setupRoot(config) })
}
