export * from './post.js';
export * from './user.js';
export * from './post-types.js';
export * from './node.js';
export * from './content.js';
export * from './ipfs.js';

export const nodeGlobalSettings = async () => {
    // If node
    if (typeof process === 'object' && process + '' === '[object process]') {
        const events = (await import('events'));
        events.EventEmitter.prototype.setMaxListeners(10000);
        events.defaultMaxListeners = 100;
    }
}
