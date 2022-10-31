import React, { useContext, useEffect } from "react";
import { startIpfs } from 'dao.xyz';
import { useAlert } from "./AlertContext";
import { useWallet } from "@dao-xyz/wallet-adapter-react";
import { MetaMaskWalletAdapter } from '@dao-xyz/wallet-adapter-metamask';
import { webSockets } from '@libp2p/websockets'
import { multiaddr } from '@multiformats/multiaddr'
import { Peerbit } from '@dao-xyz/peerbit';
import { Identity } from '@dao-xyz/ipfs-log';
import { Ed25519PublicKey, Secp256k1PublicKey } from '@dao-xyz/peerbit-crypto';
import { BaseMessageSignerWalletAdapter, SignerWalletAdapter } from "@dao-xyz/wallet-adapter-base";
import { waitFor } from '@dao-xyz/peerbit-time';

interface IPeerContext {
    peer: Peerbit,
    loading: boolean,
    waitingForSignature: boolean,
}
export const PeerContext = React.createContext<IPeerContext>({} as any);
export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }: { children: JSX.Element }) => {
    const [peer, setPeer] = React.useState<Peerbit | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [waitingForSignature, setWaitingForSignature] = React.useState<boolean>(false);
    const wallet = useWallet()
    const { alertError } = useAlert()
    const memo = React.useMemo<IPeerContext>(
        () => ({
            peer,
            loading,
            waitingForSignature
        }),
        [loading, peer?.identity?.publicKey.toString()]
    );

    useEffect(() => {
        if (!wallet.publicKey)
            return;


        if (wallet.wallet.adapter instanceof MetaMaskWalletAdapter === false) {
            console.error(`Wallet adapter: ${wallet.wallet.adapter.constructor.name} is not supported for OrbitDB yet`)
            return;
        }

        setLoading(true);

        console.log('create ipfs node', process.env)

        /* 
        new Promise((resolve) => resolve(create({
            port: 5001,
            timeout: 10000,
        })))
        ; 
        */
        startIpfs('js', ({
            module: {
                disposable: false
            },
            ipfsOptions: {
                relay: { enabled: false, hop: { enabled: false, active: false } },
                preload: { enabled: false },
                EXPERIMENTAL: { ipnsPubsub: false, "pubsub": true } as any,
                offline: true,
                config: {
                    Bootstrap: [],
                    Addresses: {
                        Swarm: []
                    },
                    Discovery: {
                        MDNS: { Enabled: false },
                        webRTCStar: { Enabled: false },
                    },
                },
                repo: String(Math.random() + Date.now()),
                libp2p: {
                    connectionManager: {
                        autoDial: false
                    },
                    ...(process.env.REACT_APP_NETWORK === 'local' ? {
                        transports: [ // Add websocket impl so we can connect to "unsafe" ws (production only allows wss)
                            webSockets({
                                filter: (addrs) => addrs.filter((addr) => addr.toString().indexOf("/ws/") != -1 || addr.toString().indexOf("/wss/") != -1),

                            })
                        ]
                    } : {})
                }
            }

        })).then(async (node) => {

            if (process.env.REACT_APP_NETWORK === 'local') {
                await node.api.swarm.connect(multiaddr("/ip4/192.168.1.212/tcp/8081/ws/p2p/12D3KooWA5LWHc5FrLkMJCFGhERuiFuXxP2GYd5D7yExK5M72DBN"))
            }

            else {
                const bootstrapConfig: { bootstrap: string[] } = { bootstrap: ["/dns4/e182fe9c0b82c9fe13b5c6470cc6e6c4edf2144c.peerchecker.com/tcp/4002/wss/p2p/12D3KooWCDvdPTTNy5Aj59wQtRQpYjnGCuobVJnhhFb4DRXdkbHw"] }
                await Promise.all(bootstrapConfig.bootstrap.map((bootstrap) => node.api.swarm.connect(multiaddr(bootstrap)).catch(error => {
                    console.error("PEER CONNECT ERROR", error);
                    alertError("Failed to connect to peers. Please try again later.")
                    throw error;
                })))
            }

            console.log('Connected to swarm!');
            // TODO fix types
            const identity: Identity = {
                publicKey: (wallet.publicKey as (Ed25519PublicKey | Secp256k1PublicKey)) as any,
                sign: (data) => (wallet.signMessage(data))
            };

            console.log('Identity', identity.publicKey.toString())
            Peerbit.create(node.api, { identity }).then(async (peer) => {
                console.log("Created peer", peer);
                setPeer(peer);
                console.log('subs', (await node.api.pubsub.ls()))

            })

        }).finally(() => {
            setLoading(false);
        })






    }
        ,
        [wallet?.publicKey?.toString()])

    return (
        <PeerContext.Provider value={memo}>
            {children}
        </PeerContext.Provider>
    );
};
