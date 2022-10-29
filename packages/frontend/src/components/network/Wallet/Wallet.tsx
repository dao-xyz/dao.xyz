import React, { FC, useMemo } from "react";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@dao-xyz/wallet-adapter-material-ui";
import { clusterApiUrl } from "@solana/web3.js";

import { WalletMultiButtonMui } from "./WalletMultiButton";
import { ButtonProps } from "@mui/material";

// Default styles that can be overridden by your app
require("@dao-xyz/wallet-adapter-react-ui/styles.css");
const STORAGE_KEY_CONNECT_CLICK_ONCE = "wallet.connected_click_once"

export const walletConnectClickOnce = (): boolean => localStorage.getItem(STORAGE_KEY_CONNECT_CLICK_ONCE) === "true"
const walletConnectClicked = (): void => localStorage.setItem(STORAGE_KEY_CONNECT_CLICK_ONCE, "true")

export const Wallet: FC<ButtonProps & { onWalletModalClick?: (event: React.MouseEvent) => void }> = ({ onWalletModalClick, children, ...props }) => {

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  /* const network = type;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @dao-xyz/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  ); */

  /*   return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider logo="https://avatars.githubusercontent.com/u/94802457?s=200&v=4">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    ); */
  return (
   /*  <WalletModalProvider >
      <WalletMultiButtonMui onWalletModalClick={(event) => { walletConnectClicked(); onWalletModalClick && onWalletModalClick(event) }} {...props} />
    </WalletModalProvider> */
    <></>
  )
};

// onClick={() => localStorage.setItem(STORAGE_KEY_CONNECT_CLICK_ONCE, "true")}