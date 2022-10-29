import { Button, ButtonProps } from '@mui/material';
import { useWalletDialog } from '@dao-xyz/wallet-adapter-material-ui';
import React, { FC, MouseEvent, useCallback } from 'react';

export const WalletModalButton: FC<ButtonProps> = ({ children = 'Solana wallet', onClick, ...props }) => {
    const { open, setOpen} = useWalletDialog();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented) setOpen(!open);
        },
        [onClick, open, setOpen]
    );

    return (
        <Button //className="wallet-adapter-button-trigger" 
            onClick={handleClick} {...props}>
            {children}
        </Button>
    );
};