/**
 * A decentralized storage of dao/channel/post meta data info. 
 */

import { field, variant, option } from '@dao-xyz/borsh';
import { Program, CanOpenSubPrograms } from '@dao-xyz/peerbit-program';
import { Documents, Operation, DocumentIndex } from '@dao-xyz/peerbit-document';
import { AnySearch } from '@dao-xyz/peerbit-anysearch';
import { DQuery } from '@dao-xyz/peerbit-query';
import { DynamicAccessController } from '@dao-xyz/peerbit-dynamic-access-controller';
import { Entry } from '@dao-xyz/ipfs-log';
// @ts-ignore
import { v4 as uuid } from 'uuid';
import { Address } from '@dao-xyz/peerbit-store';
import { Content, ProgramContent, StaticContent } from './content.js';
import { CollaborativeText } from './post-types.js';

/**
 * Content
 */

@variant("post")
export class Post extends Program {

    @field({ type: 'u64' })
    timestamp: bigint;

    @field({ type: Content })
    content: Content; // Text, video, images etc

    @field({ type: option(Address) })
    parent?: Address;

    @field({ type: option(DynamicAccessController) })
    acl?: DynamicAccessController

    constructor(opts?: {
        parent?: Address,
        content: Program | StaticContent,
        timestamp?: bigint,
        acl?: DynamicAccessController
    }) {
        super({ id: uuid() })
        if (opts) {
            this.parent = opts.parent;
            this.timestamp = opts.timestamp || BigInt(+new Date);
            this.content = opts.content instanceof Program ? new ProgramContent({ program: opts.content }) : opts.content;
            this.acl = opts.acl
        }
    }

    getContent<T>(): T {
        return this.content as T
    }

    async setup(): Promise<void> {
        await this.acl?.setup();
        if (this.content instanceof ProgramContent) {
            if (this.content.program instanceof CollaborativeText) {
                await this.content.program.setup();
            }
            else {
                throw new Error("Not supported")
            }
        }
        else if (this.content instanceof StaticContent) {
            /// Do nothing
        }
        else {
            throw new Error("Not supported")
        }
    }

}

@variant([1, 1])
export class Posts extends Program implements CanOpenSubPrograms {

    @field({ type: Documents })
    posts: Documents<Post>;

    @field({ type: option(DynamicAccessController) })
    acl?: DynamicAccessController

    constructor(properties?: {
        id?: string,
        acl?: DynamicAccessController
    }) {
        super(properties);
        this.posts = new Documents({ id: properties?.id, index: new DocumentIndex({ id: properties?.id, indexBy: 'id', search: new AnySearch({ id: properties?.id, query: new DQuery({ id: properties?.id }) }) }) })
        if (properties) {
            this.acl = properties.acl;
        }
    }
    async setup(): Promise<void> {
        await this.acl?.setup();
        await this.posts.setup({
            type: Post,
            canAppend: this.canCreatePost.bind(this),
            canRead: (identity) => (this.acl?.canRead || (() => Promise.resolve(true)))(identity)
        })
    }

    async canCreatePost(entry: Entry<Operation<Post>>): Promise<boolean> {
        if (this.acl && !await this.acl?.canAppend(entry)) {
            return false;
        }
        return true;
    }

    async canOpen(programToOpen: Program, fromEntry: Entry<any>): Promise<boolean> {
        if (programToOpen.constructor !== Post) {
            return false;
        }

        if (this.acl && !await this.acl.canAppend(fromEntry)) {
            return false;
        }
        return true;
    }

}