import { Menu, MenuItem, Typography, Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useWallet } from '@dao-xyz/wallet-adapter-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../../contexts/UserContext';
import { usePublicKeyWalletToCopy } from '../../utils/keys';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { Wallet } from '../network/Wallet/Wallet';

export default function ConnectMenu(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = useUser();
    const { publicKey, disconnect, wallet } = useWallet();
    console.log(publicKey)
    const {
        base58,
        copyAddress,
        content
    } = usePublicKeyWalletToCopy(publicKey, wallet, null, (_: boolean) => { });

    const navigate = useNavigate();
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };


    return (<Box sx={{ flexGrow: 0 }}>
        {
            props.displayName ? <Button sx={{ maxWidth: '150px', width: '100%' }} variant="contained" onClick={handleOpenUserMenu} startIcon={<ElectricalServicesIcon />}>

                <Typography noWrap >
                    Connect
                </Typography>

            </Button> :
                (<IconButton onClick={handleOpenUserMenu}>
                    <ElectricalServicesIcon />
                </IconButton>)
        }
        <Menu
            sx={{ mt: '45px' }}
            PaperProps={{
                style: {
                    width: 300,
                },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={() => { copyAddress() }} >
                <Wallet />
            </MenuItem>
            <MenuItem key='disconnect'/*  onClick={() => { handleCloseUserMenu(); disconnect() }} */>
                Disconnect
            </MenuItem>
        </Menu>

    </Box >)
}