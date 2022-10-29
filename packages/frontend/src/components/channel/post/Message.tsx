import { ArrowDownward, ArrowUpward, ChildCare, RocketLaunch, Send } from "@mui/icons-material";
import { Avatar, Button, Card, CardContent, Container, Grid, IconButton, Link, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

import { getUserProfilePath } from "../../../routes/routes";
import { MarkdownContent } from "../../data/MarkdownContent";
import shiba from "../../../../src/shiba_inu_taiki.jpeg";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useFeatures } from "../../../contexts/FeatureContext";
import { Post, ProgramContent } from 'pear2pear';
import { usePeer } from "../../../contexts/PeerContext";

export const Message: FC<{ post: Post, commentsCount: number }> = ({ post, commentsCount }) => {

    const [content, setContent] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const { peer } = usePeer();

    const [date, setDate] = useState<string | undefined>(undefined);
    const { openNotReady } = useFeatures();

    useEffect(() => {
        const load = async () => {
            /* let db = (post.getContent<ProgramContent>.);
            //  await db.init(peer.orbitDB, undefined) // TODO
            console.log('query!')
            db.toStringRemote((content) => {
                console.log('Succeeded to load content', content);
                setContent(content)
            }); */
            setContent('x');

        }
        load();
        /* .catch((error) => {
            console.log('failed to load conent', error.toString())
        }); */
        /*  getUser(post.data.creator, connection).then((user) => {
            setUsername(user.data.name);
         }) */
        setDate(new Date(Number(post.timestamp) * 1000).toLocaleDateString())
    }, [])
    return <Card raised elevation={2} >
        <CardContent sx={{}}>
            <Grid container spacing={1} direction="row">
                <Grid item container flex="1" direction="column">
                    <Grid item container alignItems="top" spacing={1} direction="row">
                        <Grid item>
                            <Avatar
                                alt="avatar"
                                src={shiba}
                                sx={{ width: 40, height: 40 }}
                            />
                        </Grid>
                        <Grid item container direction="column" width="fit-content">
                            <Grid item ><Link component={RouterLink} to={getUserProfilePath(username)}>
                                {
                                    username ?
                                        <Typography variant="body2"  >
                                            {username}</Typography>
                                        : <Typography variant="body2" noWrap sx={{ maxWidth: '150px' }}>
                                            {'AUTHOR' /* post.interface.author.toString() */}</Typography>
                                }
                            </Link></Grid>
                            <Grid item ><Typography color="test.secondary" variant="body2">
                                {date}</Typography></Grid>

                        </Grid>
                        <Grid item>
                            <IconButton size="small" onClick={openNotReady}><AddReactionIcon /></IconButton>

                        </Grid>
                        <Grid item sx={{ position: 'relative' }}>
                            <IconButton size="small" onClick={openNotReady}><ChatBubbleOutlineIcon /></IconButton>
                            <Typography variant="body2" sx={{ position: 'absolute', left: '21px', top: '13px' }}>{commentsCount}</Typography>
                        </Grid>
                    </Grid>
                    {content ? <Grid item sx={{ mb: '-24px', mt: '-12px' }}>
                        <MarkdownContent content={content} />
                    </Grid> : <Grid item flex="1" >
                        <Box sx={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography color="text.secondary" fontStyle="italic">Post content could not be found</Typography></Box>
                    </Grid>}
                </Grid>
            </Grid>
        </CardContent>
    </Card >
}