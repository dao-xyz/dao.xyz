import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { SelectNetwork } from './SelectNetwork';
import { Box } from '@mui/system';
import { Container } from '@mui/material';

export default function ChangeNetworkDialog(props: { open: boolean, onClose?(): void }) {
    const [open, setOpen] = React.useState(props.open);

    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        if (props.onClose)
            props.onClose();

    };

    return (
        <Dialog
            open={props.open || open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='xs'

        >
            <DialogTitle id="alert-dialog-title">
                Change network
            </DialogTitle>
            <DialogContent>

                <DialogContentText id="alert-dialog-description">
                    You can change between networks as you wish. Users and content is tied to specific networks and can not be shared between.
                </DialogContentText>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                    <SelectNetwork />
                </Box>

            </DialogContent>
            <DialogActions>

                <Button onClick={handleClose} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}