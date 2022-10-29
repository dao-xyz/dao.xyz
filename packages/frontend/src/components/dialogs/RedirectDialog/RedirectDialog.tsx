import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { REDIRECT_URL_PARAM_KEY } from '../../../routes/utils';

export default function RedirectDialog(props: { title: string, content: string, redirectPath: string, open: boolean, onClose?: () => void }) {
    const [open, setOpen] = React.useState(props.open);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        if (props.onClose)
            props.onClose();
    };

    const handleNavigation = () => {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(REDIRECT_URL_PARAM_KEY, location.pathname);
        navigate(props.redirectPath + '?' + searchParams.toString())
        handleClose();
    };
    return (
        <div>
            <Dialog
                open={props.open || open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Maybe later</Button>
                    <Button aria-label="new" onClick={handleNavigation} autoFocus >
                        Take me there
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}