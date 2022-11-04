/**
 * A decentralized storage of user data info. 
 */

import { field, variant } from '@dao-xyz/borsh';

// @ts-ignore
import { v4 as uuid } from 'uuid';
import { Program } from '@dao-xyz/peerbit-program';
import { Documents } from '@dao-xyz/peerbit-document';

@variant(12) // Support serialization
export class User {

    @field({ type: 'string' })
    id: string

    @field({ type: 'string' })
    name: string

    constructor(opts?: {
        id?: string
        name: string
    }) {
        if (opts) {
            this.id = opts.id || uuid();
            this.name = opts.name;

            this.name = this.name?.trim();
            if (!this.name || this.name.length == 0) {
                throw new Error("No name provided")
            }
        }
    }


    // TODO add soul score
}

@variant([1, 3])
export class UsersInterface extends Program {

    @field({ type: Documents })
    users: Documents<User>

    constructor(opts?: {
        id: string,
        users: Documents<User>
    }) {
        super(opts);
        if (opts) {
            this.users = opts.users;
        }
    }


    async setup(): Promise<void> {
        return this.users.setup({ type: User }) // todo can append, can read
    }
}
