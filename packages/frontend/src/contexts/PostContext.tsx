import React, { useContext, useEffect, useState } from "react";
import { Access, AccessType } from '@dao-xyz/peerbit-dynamic-access-controller';
import { usePeer } from "./PeerContext";
import { getParentPostChain, getParentPostChainTree, PostTree } from "../utils/postUtils";
import { useConfig } from "./ConfigContext";
import { Post, Posts } from 'dao.xyz';
import networkConfig from './../network.json';
import { Address } from '@dao-xyz/peerbit-store';
import { CID } from 'multiformats/cid'

interface PostSelection {
  selectionPath: Post[];
  selectionTree: PostTree;
  post: Post;
  authorities: Access[];
  authoritiesByType: Map<
    AccessType,
    Access[]
  >;
}
interface IPostContext {
  posts: Posts,
  replicationTopic: string,
  loading: boolean;
  selection: PostSelection;
  select: (postCID: string) => Promise<void>;
  loadingRoot: boolean,
}

const groupAuthoritiesByType = (
  authorities: Access[]
): Map<AccessType, Access[]> => {
  let ret = new Map();
  for (const authority of authorities) {
    for (const type of authority.accessTypes) {
      let arr = ret.get(type);
      if (!arr) {
        arr = [];
        ret.set(type, arr);
      }
      arr.push(authority);
    }
  }
  return ret;
};
export const Postscontext = React.createContext<IPostContext>({} as any);
export const usePosts = () => useContext(Postscontext);
export const PostsProvider = ({ children }: { children: JSX.Element }) => {


  // const [accountCache, setAccountCache] = useState(new AccountCache<Shard<PostInterface>>(50));
  const [selection, setSelection] = React.useState<PostSelection>(/* isMock ? mockChannelSelection() :  */{
    selectionPath: undefined,
    selectionTree: undefined,
    authorities: undefined,
    authoritiesByType: undefined,
    post: undefined,
  });
  const { peer, rootIdentity } = usePeer();
  const [loading, setLoading] = useState(false);
  const [root, setRoot] = useState<Posts>();
  const [loadingRoot, setLoadingRoot] = useState(false);

  if (peer) {
    peer?.ipfs.pubsub.ls().then((ls) => console.log(ls));
  }

  useEffect(() => {
    console.log('POST CONTEXT EFFECT', peer?.ipfs)
    if (peer?.ipfs) {
      setLoadingRoot(true);
      // Address.parse("/peerbit/zdpuB2pw8hxT8EK4WJ1DMeGPUfxoferspohXTmMNhV9nTguBD")
      console.log('open!')
      console.log('address!: ' + networkConfig.postsAddress);
      peer.open<Posts>(Address.parse(networkConfig.postsAddress), { replicate: false, replicationTopic: networkConfig.networkAddress }).then(async (posts) => {
        console.log('got posts', posts);
        setRoot(posts);

        // use the root identity to trust the hot identity
        await posts.acl.identityGraphController.addRelation(peer.identity.publicKey, { identity: rootIdentity })
      }).catch((e) => console.error("ERROR", e)).finally(() => {
        setLoadingRoot(false);
      })

    }
  },
    [networkConfig.postsAddress, !!peer?.ipfs])
  const selectionMemo = React.useMemo(
    () => ({
      selection,
      loading,
      replicationTopic: networkConfig.networkAddress || 'world',
      posts: root,
      select: async (address: string) => {
        if (!peer?.ipfs) {
          return undefined;
        }
        setLoading(true);
        let previousSelection = selection;
        setSelection({
          selectionPath: undefined,
          selectionTree: undefined,
          authorities: undefined,
          authoritiesByType: undefined,
          post: undefined,
        });
        let post: Post = undefined;

        if (!post) {
          console.log('load post from address', address)
          post = await Post.load<Post>(peer.ipfs, Address.parse(address));
        }

        let parents: Post[] = [
          post,
          ...(await getParentPostChain(
            post,
            peer
          )),
        ];

        let parentTree = await getParentPostChainTree(root, parents);
        let previousParentTree = previousSelection.selectionTree;

        // If same DAO, then keep memory
        if (
          selection.selectionPath &&
          parents[parents.length - 1].address.toString() == (
            selection.selectionPath[selection.selectionPath.length - 1].address.toString()
          )
        ) {
          for (const key in previousParentTree) {
            if (!parentTree[key]) {
              parentTree[key] = previousParentTree[key]; // Remember last previous things
            }
          }
        }

        let authoritiesForPost = [] //TODO fi Object.values(post.interface.acl.index);
        setSelection({
          post: post,
          selectionPath: parents,
          selectionTree: parentTree,
          authorities: authoritiesForPost,
          authoritiesByType: groupAuthoritiesByType(authoritiesForPost),
        });
        setLoading(false);
      },
      loadingRoot
    } as IPostContext),
    [selection, loading, root?.address?.toString(), !!peer?.ipfs, loadingRoot]
  );



  return (
    <Postscontext.Provider value={selectionMemo}>
      {children}
    </Postscontext.Provider>
  );
};
