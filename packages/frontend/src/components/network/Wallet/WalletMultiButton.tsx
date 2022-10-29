import { Button, ButtonProps } from '@mui/material';
import { useWallet } from '@dao-xyz/wallet-adapter-react';
import { useWalletDialog, WalletIcon } from '@dao-xyz/wallet-adapter-material-ui';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState, MouseEvent, ReactElement, CSSProperties } from 'react';
import { usePublicKeyWalletToCopy } from '../../../utils/keys';
import { WalletConnectButton } from './WalletConnectButton';
import { WalletModalButton } from './WalletModalButton';



export const WalletMultiButtonMui: FC<ButtonProps & { onWalletModalClick: (event: React.MouseEvent) => void }> = ({ children, onWalletModalClick, ...props }) => {
    const { publicKey, wallet, disconnect } = useWallet();
    const { open, setOpen } = useWalletDialog();
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    /*  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
     const content = useMemo(() => {
         if (children) return children;
         if (!wallet || !base58) return null;
         return base58.slice(0, 4) + '..' + base58.slice(-4);
     }, [children, wallet, base58]);
 
     const copyAddress = useCallback(async () => {
         if (base58) {
             await navigator.clipboard.writeText(base58);
             setCopied(true);
             setTimeout(() => setCopied(false), 400);
         }
     }, [base58]); */

    const {
        base58,
        copyAddress,
        content
    } = usePublicKeyWalletToCopy(publicKey, wallet, children, setCopied);

    const openDropdown = useCallback(() => setActive(true), [setActive]);

    const closeDropdown = useCallback(() => setActive(false), [setActive]);

    const openModal = useCallback(() => {
        setOpen(true);
        closeDropdown();
    }, [setOpen, closeDropdown]);

    useEffect(() => {
        const listener = (event: any) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target as Node)) return;

            closeDropdown();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);

    if (!wallet) return <WalletModalButton {...props} onClick={onWalletModalClick} />;
    if (!base58) return <WalletConnectButton {...props} />;

    return (
        <div className="wallet-adapter-dropdown">
            <Button
                aria-expanded={active}
                //  className="wallet-adapter-button-trigger"
                sx={{ pointerEvents: active ? 'none' : 'auto', ...props.style }}
                onClick={openDropdown}
                // TODO Sollet icon does not work well with this
                startIcon={<WalletIcon wallet={wallet} />}
                {...props}
            >
                {content}
            </Button>
            <ul
                aria-label="dropdown-list"
                className={`wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`}
                ref={ref}
                role="menu"
            >
                <li onClick={copyAddress} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    {copied ? 'Copied' : 'Copy address'}
                </li>
                <li onClick={openModal} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Connect a different wallet
                </li>
                <li onClick={disconnect} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Disconnect
                </li>
            </ul>
        </div>
    );
};