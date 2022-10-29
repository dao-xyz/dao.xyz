import { ChildCare, RocketLaunch, Send } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, Container, Grid, IconButton, Paper, TextField, Toolbar, Typography } from "@mui/material";
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { PostFeed } from "./PostFeed";
import { usePosts } from "../../../contexts/PostContext";
import NewPost from "./NewPost";
import useScrollbarSize from 'react-scrollbar-size';
import { useTheme } from "@mui/styles";
import { ChannelLabelBreadcrumb } from "../ChannelLabelBreadcrumb";
import CastleIcon from '@mui/icons-material/Castle';
import InfoIcon from '@mui/icons-material/Info';
import { Post, Posts } from 'pear2pear';
export const Chat: FC<{ parentPost?: Posts }> = ({ parentPost: parentPostIn }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [initialFeed, setInitialFeed] = React.useState(false);
    const [parentPost, setParentPost] = React.useState(parentPostIn);

    const [showNewMessageAlert, setShowNewMessageAlert] = React.useState(false);
    const [createdPost, setCreatedPost] = React.useState<string | undefined>(undefined);
    const [scrollTop, setScrollTop] = useState(0);
    const theme = useTheme();
    const { width } = useScrollbarSize();
    const { posts, loading } = usePosts();
    const [openSettings, setOpenSettings] = React.useState(false);
    /*   const {
          loading,
          select,
          selection,
      } = useChannels();
      return <Box sx={{ pt: 2, paddingBottom: "env(safe-area-inset-bottom)" }}>
          <Grid container sx={{ pr: 2, pl: 2 }} direction="row" justifyContent='right'>
              <Grid item sx={{ mr: 'auto' }}>  <ChannelLabelBreadcrumb /></Grid>
              <Grid item> <IconButton onClick={() => setOpenSettings(!openSettings)} ><InfoIcon /></IconButton> </Grid>
              <Grid item> <IconButton onClick={() => setOpenSettings(!openSettings)} ><CastleIcon /></IconButton> </Grid>
          </Grid>
          {
              loading ? <Box sx={{ display: 'flex', justifyContent: 'center', verticalAlign: 'center' }}>
                  <CircularProgress />
              </Box> : <></>
          }
          <Drawer
              anchor='top'
              open={openSettings}
              onClose={() => setOpenSettings(false)}
          >
              {selection.selectionPath && <ChannelSettings channel={selection.selectionPath[0]} authorities={selection.authorities} authoritiesByType={selection.authoritiesByType}></ChannelSettings>}
          </Drawer>
  
          {
  
              selection.channel?.data &&
              { [ChannelType.Chat]: (<Chat parentPost={selection.channel}></Chat>), [ChannelType.Collection]: (<Collection channel={selection.channel}></Collection>) }
              [selection.channel.data.channelType]
  
          }
          {
              !selection.channel?.data && !loading && <>Channel could not be loaded</>
          }
  
  
      </Box >  */


    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
            setShowNewMessageAlert(false);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    useEffect(() => {
        if (!parentPost) {
            setParentPost(posts)
        }
    }, [parentPost?.address?.toString(), posts?.address?.toString()])
    const onFeedChange = () => {
        let isAtBottom = contentRef?.current?.scrollHeight - contentRef?.current?.scrollTop === contentRef?.current?.clientHeight;
        if (!isAtBottom) {
            // show alert
            setShowNewMessageAlert(true);
            setTimeout(() => {
                setShowNewMessageAlert(false)
                setInitialFeed(true);
            }, 3000)
        }

    }


    return <Box sx={{ backgroundColor: (theme as any).palette.mode == 'light' ? (theme as any).palette.grey["50"] : (theme as any).palette.background.default, paddingBottom: "env(safe-area-inset-bottom)" }}>

        <Box >
            <Grid container sx={{ pr: 2, pl: 2 }} direction="row" justifyContent='right'>
                <Grid item sx={{ mr: 'auto' }}>  <ChannelLabelBreadcrumb /></Grid>
                <Grid item> <IconButton onClick={() => setOpenSettings(!openSettings)} ><InfoIcon /></IconButton> </Grid>
                <Grid item> <IconButton onClick={() => setOpenSettings(!openSettings)} ><CastleIcon /></IconButton> </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100vh - 90px)" }} >

                <Grid container flexDirection="column" alignItems="center" sx={{ height: '100%' }}>
                    <Grid ref={contentRef} container item sx={{ width: '100%', flex: 1, display: 'flex', justifyContent: "center", overflowY: 'scroll', mt: 2, /* mr: -2, pr: 2  */ }} >
                        <Grid item sx={{ maxWidth: "md", width: '100%', }}>
                            <Box sx={{ /* ml: 2, pr: 16 + "px"  */ }}>
                                <Box sx={{ width: '100%' }}>

                                    <PostFeed onFeedChange={onFeedChange} parentPosts={parentPost} />

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    {showNewMessageAlert && initialFeed && !loading && <Alert variant="filled" severity="info">
                        New messages available
                    </Alert>}
                    <Grid container item direction="row" sx={{ width: `100%`, display: 'flex', justifyContent: 'center' }} >
                        <Grid item sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                            <Card sx={{ width: '100%', flex: 1, maxWidth: 'md' }} raised elevation={8}>
                                <CardContent sx={{ pb: "4px !important" }}>
                                    {parentPost?.address?.toString() ? <NewPost previewable={true} onCreation={setCreatedPost} parentPost={undefined} /> : <></>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sx={{ width: width + 'px', height: '100%' }}>
                            <div></div>
                        </Grid>
                    </Grid>
                </Grid>


            </Box>
        </Box>
    </Box>
}