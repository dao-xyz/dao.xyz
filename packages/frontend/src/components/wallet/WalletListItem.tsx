import { Box, Button, Typography } from '@mui/material';
import { WalletReadyState } from '@dao-xyz/wallet-adapter-base';
import { Wallet } from '@dao-xyz/wallet-adapter-react';
import { WalletIcon } from '@dao-xyz/wallet-adapter-material-ui';
import React, { FC, MouseEventHandler } from 'react';

export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
    return (
        <li>
            <Button onClick={handleClick} startIcon={<Box sx={{ width: '30px', display: 'flex', mr: 1, height: '30px' }}><WalletIcon wallet={wallet} /></Box>} tabIndex={tabIndex}>
                {wallet.adapter.name}
                {wallet.readyState === WalletReadyState.Installed && <> - Detected</>}
            </Button>
        </li>
    );
};