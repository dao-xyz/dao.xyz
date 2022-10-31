import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Header from '../../components/Header/Header';
import { useConnection } from '@dao-xyz/wallet-adapter-react';
import { BaseRoutes } from '../../routes/routes';
import { usePosts } from '../../contexts/PostContext';
import { useMatch } from 'react-router-dom';
import { useFeatures } from '../../contexts/FeatureContext';
import { Posts, Post } from 'dao.xyz';

const drawerWidth = 240;

export default function ContentOutlet() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    /*  const params = useMatch(DAO + "/:key")?.params; */
    const { connection } = useConnection();
    const [channel, setChannel] = React.useState<Posts | null>(null);
    const [notFound, setNotFound] = React.useState(false);
    const { select } = usePosts();
    const { openNotReady } = useFeatures();

    /*    React.useEffect(() => {
           if (params?.key) {
               select(params?.key)
           }
       }, [params?.key]) */


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            CONTENT
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header onDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth}></Header>
            {false && <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.

                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { /* backgroundColor: theme => theme.palette.action.hover, */ boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { /* backgroundColor: theme => theme.palette.action.hover, */ boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>}
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar variant="dense" />
                <BaseRoutes />
            </Box>

        </Box >
    );
}