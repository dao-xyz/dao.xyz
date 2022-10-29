import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Paper,
    TextField,

} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Send } from "@mui/icons-material";
import { useWallet } from "@dao-xyz/wallet-adapter-react";
import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown'
import { useAlert } from "../../../contexts/AlertContext";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import TitleIcon from '@mui/icons-material/Title';
import AddIcon from '@mui/icons-material/Add';
import AbcIcon from '@mui/icons-material/Abc';
import { useTheme } from "@mui/styles";
import { useFeatures } from "../../../contexts/FeatureContext";
import { usePeer } from "../../../contexts/PeerContext";
import { Post, CollaborativeText } from "pear2pear";
import { Range } from "@dao-xyz/peerbit-string";

const REPLICATION_TOPIC = 'world';
export function NewPost(props: { previewable?: boolean, parentPost: Post, onCreation: (post: string) => any }) {
    const [text, setText] = React.useState('');
    const { publicKey } = useWallet();
    const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState<string | undefined>(undefined);
    /* const { publicKey, sendTransaction } = useWallet();
    const { burnerWallet, burnerWalletBalance } = useSmartWallet(); */
    /* const { connected, getAdapter, checkPassword, reset } = useIpfsService();
      const [ipfsDialogVisible, setIpfsDialogVisible] = React.useState(false); */
    const [passwordDialogVisible, setPasswordDialogVisible] = React.useState(false);
    const [previewMarkdown, setPreviewMarkdown] = React.useState(false);
    const theme = useTheme();
    const { alertError, alert } = useAlert();
    const { openNotReady } = useFeatures();
    const { peer } = usePeer();

    const createPost = useCallback(async () => {
        /* if (!connected) {
            setIpfsDialogVisible(true);
            return;
        } */

        /*  if (!await checkPassword(password)) {
             setPasswordDialogVisible(true);
             return;
         } */
        // Upload content
        setLoading(true)


        console.log((await peer.ipfs.swarm.peers()).map(x => x.addr.toString()))
        /*         await peer.node.swarm.connect("/ip4/127.0.0.1/tcp/5432/ws/p2p/12D3KooWC1Pb6XmSxY4YKGUPicYME8Ea27Y2gS4SbFKRndPzgF4C");
              console.log((await peer.node.swarm.peers()).map(x => x.addr.toString())) */
        let post = new Post({ content: new CollaborativeText({}) })
        post = await peer.open<Post>(post, { replicationTopic: REPLICATION_TOPIC });
        await post.getContent<CollaborativeText>().text.add(text, new Range({ offset: 0, length: text.length }));
        try {


            setPreviewMarkdown(false);
            alert({
                severity: 'success',
                text: 'Post created!'
            })
            setText('');
        }
        catch (error) {
            alert({
                severity: 'error',
                text: "Something went wrong. Error: " + JSON.stringify(error, Object.getOwnPropertyNames(error))
            });
        }
        finally {
            setLoading(false)

        }



    }, [text, /* connected,  */password])
    return (
        <Grid container direction="column" >
            <Grid container item justifyContent="space-between" spacing={1}>
                <Grid item flex={1}>
                    <TextField size="small"
                        id="outlined-multiline-flexible"
                        label="Create post"
                        multiline
                        maxRows={4}
                        sx={{ width: '100%' }}
                        onChange={(event) => {
                            setText(event.target.value)
                        }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter' && !ev.shiftKey) {
                                ev.preventDefault();

                                // Send
                                createPost();
                            }
                        }}
                        value={text}
                    />
                    {(text.length > 0 && props.previewable) && <FormControlLabel
                        control={
                            <Checkbox checked={previewMarkdown} onChange={(event) => setPreviewMarkdown(event.target.checked)} name="jason" />
                        }
                        label="Preview markdown"
                    />
                    }
                    {
                        previewMarkdown ? <Paper variant="outlined" sx={{ p: 2 }} >
                            <ReactMarkdown components={{
                                img({ ...props }) {
                                    return (<img  {...props} width={'100%'} />)
                                }

                            }}
                            >{text}</ReactMarkdown> </Paper> : <></>
                    }
                </Grid>

                <Grid item>
                    <IconButton disabled={loading || !text.trim()} onClick={createPost}>
                        {!loading ? <Send /> : <CircularProgress size={24} />}
                    </IconButton>
                </Grid>

                {/*  <IpfsWalletContext.Provider
                    value={{
                        visible: ipfsDialogVisible,
                        setVisible: setIpfsDialogVisible,
                    }}
                >
                    {ipfsDialogVisible && <IpfsServiceModal onSave={createPost} />}
                </IpfsWalletContext.Provider>
                <IpfsProviderPasswordDialog open={passwordDialogVisible} onReset={() => { }} setOpen={setPasswordDialogVisible} setPassword={(password) => { setPassword(password); createPost() }} /> */}

            </Grid >
            <Grid item container justifyContent="right">
                <IconButton sx={{ marginRight: 'auto' }} onClick={openNotReady}   ><AddIcon /></IconButton>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button color="inherit" onClick={openNotReady}>Proposal</Button>

                    <IconButton onClick={openNotReady}><FormatBoldIcon /></IconButton>
                    <IconButton onClick={openNotReady}><FormatItalicIcon /></IconButton>
                    <IconButton onClick={openNotReady}><FormatIndentIncreaseIcon /></IconButton>
                    <IconButton onClick={openNotReady} ><FormatIndentDecreaseIcon /></IconButton>
                    <IconButton onClick={openNotReady}><TitleIcon /></IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "right", alignItems: "center" }}>
                    <Button color="inherit" onClick={openNotReady}>Proposal</Button>

                    <IconButton onClick={openNotReady}><AbcIcon /></IconButton>

                </Box>
                <IconButton onClick={openNotReady}><VideoCallIcon /></IconButton>
                <IconButton onClick={openNotReady}><HeadsetMicIcon /></IconButton>
                <IconButton onClick={openNotReady}><EmojiEmotionsIcon /></IconButton>

            </Grid>


            {/*             <Grid item container color="text.secondary" sx={{ height: '5px', justifyContent: "right" }}>
                {!!burnerWallet && <Grid item sx={{ mr: 1 }}>
                    <Link variant="caption" component={RouterLink} to={SETTINGS_BURNER} target="_blank">Burner wallet balance: {burnerWalletBalance}</Link>
                </Grid>}
            </Grid> */}

        </Grid >
    );
}

export default NewPost;