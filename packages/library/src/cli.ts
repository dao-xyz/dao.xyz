import { cli as nodeCli } from '@dao-xyz/peerbit-node';
import { setupRoot } from './node.js';

const CLI_NAME = "daoxyz"

export const cli = async () => {
    await nodeCli({ cliName: CLI_NAME, onStart: (config) => setupRoot(config) })
}
