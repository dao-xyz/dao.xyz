
import { Post, Posts } from 'dao.xyz';
import { AccountCache } from "./accountCache";
import { Peerbit } from '@dao-xyz/peerbit';
import { PageQueryRequest, ResultWithSource } from '@dao-xyz/peerbit-anysearch';
export const getParentPostChain = async (
  post: Post,
  peer: Peerbit,
  accountCache?: AccountCache<Post>,
): Promise<Post[]> => {
  let ret = [];
  let current = post;
  while (current?.parent) {
    if (accountCache && !!accountCache.get(current?.parent.toString())) {
      current = accountCache.get(current.parent.toString());
    } else {
      console.log('load parent post from cid', current.parent.toString())
      current = await Post.load<Post>(peer.ipfs, current.parent)
    }
    ret.push(current);
  }
  return ret;
};
export type PostTree = {
  [key: string]: Post[];
};
export const CHANNEL_TREE_ROOT = "root";

export const getParentPostChainTree = async (
  posts: Posts,
  parents: Post[]
): Promise<PostTree> => {
  let ret: PostTree = {};
  for (const parent of parents) {
    /*     if(!parent.interface.comments.db.db)
         await parent.interface.comments.db.db.load(1); */
    const childrenOfParent: Post[] = [];
    posts.posts.index.search.query(new PageQueryRequest({ queries: [] }), (result) => {
      result.results.forEach((result) => {
        childrenOfParent.push((result as ResultWithSource).source as Post)
      })
    }, { maxAggregationTime: 5000 })
    ret[parent ? parent?.address.toString() : CHANNEL_TREE_ROOT] = childrenOfParent;
  }
  return ret;
};
/* 
export const getChannelContentString = async (
  channel: Shard<PostInterface>
): Promise<string | undefined> => {
  if (channel.info) {
    return Promise.resolve(undefined);
  }
  if (channel.info instanceof ContentSourceString) {
    return Promise.resolve(channel.info.string);
  }
  let url = (channel.info as ContentSourceExternal).url;
  if (url && isValidHttpUrl(url)) {
    const result = await fetch(url, {}).catch(() => undefined);
    if (result) {
      if (result.status >= 200 && result.status < 300) {
        let text = await result.text().catch(() => undefined);
        return text;
      }
    }
    return undefined;
  }
};
 */


