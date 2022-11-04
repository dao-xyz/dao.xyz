import { createLibp2p } from 'libp2p'
import * as IPFS from 'ipfs-core'
import { tcp } from '@libp2p/tcp'
import { webSockets } from '@libp2p/websockets'

import { mdns } from '@libp2p/mdns'
import { bootstrap } from '@libp2p/bootstrap'
import { kadDHT } from '@libp2p/kad-dht'
import { mplex } from '@libp2p/mplex'
import { noise } from '@chainsafe/libp2p-noise'

/**
 * Options for the libp2p bundle
 * @typedef {Object} libp2pBundle~options
 * @property {PeerId} peerId - The PeerId of the IPFS node
 * @property {Object} config - The config of the IPFS node
 * @property {Object} options - The options given to the IPFS node
 */

/**
 * This is the bundle we will use to create our fully customized libp2p bundle.
 *
 * @param {libp2pBundle~options} opts The options to use when generating the libp2p node
 * @returns {Libp2p} Our new libp2p node
 */
export const libp2pBundle = (opts) => {
    // Set convenience variables to clearly showcase some of the useful things that are available
    const peerId = opts.peerId
    const bootstrapList = opts.config.Bootstrap

    // Build and return our libp2p node
    // n.b. for full configuration options, see https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md
    return createLibp2p({
        peerId,
        addresses: {
            listen: ['/ip4/127.0.0.1/tcp/0']
        },
        // Lets limit the connection managers peers and have it check peer health less frequently
        connectionManager: {
            autoDial: false
        },
        transports: [
            webSockets({
                filter: (addrs) => addrs.filter((addr) => addr.toString().indexOf("/ws/") != -1 || addr.toString().indexOf("/wss/") != -1),
            })
        ],
        streamMuxers: [
            mplex()
        ],
        connectionEncryption: [
            noise()
        ],
        peerDiscovery: [,
            bootstrap({
                list: bootstrapList
            })
        ],
        dht: kadDHT(),
        // Turn on relay with hop active so we can connect to more peers
        relay: {
            enabled: false,
            hop: {
                enabled: false,
                active: false
            }
        },
        metrics: {
            enabled: true,
            computeThrottleMaxQueueSize: 1000,  // How many messages a stat will queue before processing
            computeThrottleTimeout: 2000,       // Time in milliseconds a stat will wait, after the last item was added, before processing
            movingAverageIntervals: [           // The moving averages that will be computed
                60 * 1000, // 1 minute
                5 * 60 * 1000, // 5 minutes
                15 * 60 * 1000 // 15 minutes
            ],
            maxOldPeersRetention: 50            // How many disconnected peers we will retain stats for
        }
    })
}
