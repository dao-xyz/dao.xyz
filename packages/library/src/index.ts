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
/* 
export const createNode = async (ipfsNode: IPFS, identity?: Identity, options: { directory: string }): Promise<AnyPeer> => {

    globalSettings();
    console.log("Starting node ...")
    const directoryId = (await ipfsNode.id()).id;

    let orbitDB = await OrbitDB.createInstance(ipfsNode, { directory });
    await peer.create({ options: serverOptions, orbitDB });

    console.log("Created node with");
    console.log("OrbitDB: " + peer.orbitDB.id);
    console.log("IPFS: " + (await peer.node.id()).id);
    return peer;
} */