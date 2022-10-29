import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, Snackbar } from '@mui/material';

export default function NotReadyYetDialog(props: { open: boolean, onClose?: () => void }) {
    const [open, setOpen] = React.useState(props.open);

    const handleClose = (event) => {

        setOpen(false);
        if (props.onClose)
            props.onClose();
    };
    React.useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const nav = (event) => {
        event.stopPropagation();
        window.open("https://twitter.com/DAOxyzDAO", '_blank').focus();

    }
    const action = (
        <Button size="small" onTouchStart={nav} onClick={nav}>
            Follow us! <img src="https://avatars.githubusercontent.com/u/50278?s=200&v=4" alt="drawing" style={{ width: "30px", marginLeft: '10px   ' }} />
        </Button>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="Not live yet..."
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                action={action}
            />

        </div>
    );
}