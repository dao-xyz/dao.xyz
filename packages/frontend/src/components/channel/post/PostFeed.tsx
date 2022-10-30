import {
    Box,
    Skeleton,
    Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { Message } from "./Message";
import { Post, Posts } from 'pear2pear';
import { PageQueryRequest, ResultWithSource } from '@dao-xyz/peerbit-anysearch';
import { usePeer } from "../../../contexts/PeerContext";

const createChildrenMap = (posts: Post[]): { [key: string]: Post[] } => {
    let ret = {};
    posts.forEach((post) => {
        if (post.parent) {
            let arr = ret[post.parent.toString()];
            if (!arr) {
                arr = [];
                ret[post.parent.toString()] = arr;
            }
            arr.push(post)
        }
    })

    return ret;
}


export const PostFeed = (props: { parentPosts: Posts, onFeedChange?: () => void }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [childrenPosts, setChildrenPosts] = useState<{ [key: string]: Post[] }>({});
    const [messagesLoading, setMessagesLoading] = useState(false);
    const { loading } = usePeer();

    const childrenCount = (key: string) => childrenPosts[key] ? childrenPosts[key].length : 0;
    const updateContent = () => {
        {
            /*  setLoading(true);
             const postPromises: Promise<Shard<PostInterface>[]>[] = []
             for (const channel of props.channels) {
                 postPromises.push(getPostsByChannel(channel.pubkey, connection))
             }
             Promise.all(postPromises).then(results => {
                 let flatResults = results.flat(1);
                 let updatedResults = mergePosts(posts, flatResults.sort((a, b) => a.data.createAtTimestamp.cmp(b.data.createAtTimestamp)));
                 if (!postsEquals(posts, updatedResults)) {
                     setPosts(updatedResults);
                     if (props.onFeedChange) {
                         props.onFeedChange();
                     }
                 }
             }).finally(() => {
                 setChildrenPosts(createChildrenMap(posts))
                 setLoading(false);
 
             }) */

            props.parentPosts?.posts.initialized && props.parentPosts?.posts.index.search.query(new PageQueryRequest({ queries: [] }), (resp) => {
                console.log('got post resp', resp, props.parentPosts);
                setPosts(resp.results.map(r => { const s = ((r as ResultWithSource).source as Post); return s }));
            })

            //const posts = props.parentPosts.map(parentPost => parentPost.interface.comments.db.db.all).flat(1);
            setChildrenPosts(createChildrenMap(posts));

        }
        /* else {
            let mockPostsGenerated = mockPosts(theme["palette"].mode != 'light')
            setPosts(mockPostsGenerated);
            setChildrenPosts(createChildrenMap(mockPostsGenerated))
        } */


    }
    useEffect(() => {
        setPosts([]);

    }, [props.parentPosts && (props.parentPosts[0] ? props.parentPosts[0].cid : !!props.parentPosts[0])])
    /*  useEffect(() => {
        if (props.parentPosts[0]) {
            props.parentPosts[0].interface.comments.db.db.events.on('log.op.ADD', (id, hash, payload) => console.log('POST', hash))
        }
    }, [props.parentPosts[0] ? props.parentPosts[0].cid : !!props.parentPosts[0]]) */
    // console.log(props.parentPosts[0] ? props.parentPosts[0].interface.comments.db.db.all : 'loading');
    //console.log('psts length', posts.length)
    useEffect(() => {

        updateContent();

    }, [/* isMock,  */posts.length])/* posts.length, theme["palette"].mode */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!messagesLoading) {
                updateContent();
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [props.parentPosts && (props.parentPosts[0] ? props.parentPosts[0].cid : !!props.parentPosts[0]), posts.length, posts ? posts[posts.length - 1]?.address?.toString() : undefined])
    return (
        <Box sx={{ pb: 1 }}>
            {messagesLoading || loading ? <><Skeleton sx={{ mt: 2, mb: 2 }} animation="wave" variant="rectangular" width='100%' height={200} /><Skeleton sx={{ mt: 2, mb: 2 }} animation="wave" variant="rectangular" width='100%' height={75} /><Skeleton sx={{ mt: 2, mb: 2 }} animation="wave" variant="rectangular" width='100%' height={150} /></> : <></>}
            {!messagesLoading && !loading && (posts.length > 0 ? posts.map((post, ix) => <Box key={ix} sx={{ width: "100%", mt: ix > 0 ? 2 : 0, mb: 2 }} ><Message post={post} commentsCount={childrenCount(post.address.toString())} /></Box>) : <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}><Typography color="text.secondary">No messages found</Typography></Box>)}

        </Box>
    );
}

