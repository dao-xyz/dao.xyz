import { Address } from '@dao-xyz/peerbit-store';
import { variant, field, vec, option } from '@dao-xyz/borsh'
import { StaticContent } from './content.js';
import { Program } from '@dao-xyz/peerbit-program';
import { DString } from '@dao-xyz/peerbit-string';
import { DynamicAccessController } from '@dao-xyz/peerbit-dynamic-access-controller';
import { v4 as uuid } from 'uuid';

@variant([2, 0])
export class NetworkPost extends StaticContent {

    @field({ type: Address })
    network: Address

    @field({ type: vec('string') })
    addresses: string[]

    @field({ type: 'string' })
    info: string

    constructor(properties?: { network: Address, addresses: string[], info: string }) {
        super();
        if (properties) {
            this.network = properties.network;
            this.addresses = properties.addresses;
            this.info = properties.info;
        }
    }

}


@variant([2, 0])
export class CollaborativeText extends Program {

    @field({ type: DString })
    text: DString // distributed string 

    @field({ type: option(DynamicAccessController) })
    acl?: DynamicAccessController

    constructor(properties?: { acl?: DynamicAccessController, text?: DString }) {
        super({ id: uuid() })
        this.text = properties?.text || new DString({ id: this.id })
        this.acl = properties?.acl
    }

    async setup() {
        await this.acl?.setup()
        await this.text.setup({
            canAppend: (entry) => (this.acl?.canAppend || (() => Promise.resolve(true)))(entry),
            canRead: (identity) => (this.acl?.canRead || (() => Promise.resolve(true)))(identity)
        })
    }
}
