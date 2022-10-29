import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
/* 
import {
  useConnection,
  useLocalStorage,
  useWallet,
} from "@dao-xyz/wallet-adapter-react";
import { AccountInfoDeserialized } from "@dao-xyz/sdk-common";
import { Shard, getChannel, getChannels } from "@dao-xyz/sdk-social";
import {
  createUserTransaction,
  UserAccount,
  getUserByName,
} from "@dao-xyz/sdk-user";
import { NetworkContext } from "./Network";
import RedirectDialog from "../components/dialogs/RedirectDialog/RedirectDialog";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
  SignForMeAccount,
  createSignForMe,
  getSigningCapabilities,
  getDelegatedSigners,
} from "@dao-xyz/sdk-signforme";
import * as bs58 from "bs58";

interface ISmartWalletContext {
  loading: boolean;
  burnerWallet: BurnerWallet;
  burnerWalletBalance: number;
  capabilities: AccountInfoDeserialized<SignForMeAccount>[];
  delegatedSigners: AccountInfoDeserialized<SignForMeAccount>[];
  createBurnerWallet: (
    scope: PublicKey,
    initialLamports: number
  ) => Promise<void>;
  createSigner: (signer: PublicKey, scope: PublicKey) => Promise<void>;
  fillBurnerWallet: (
    burnerWalletKey: PublicKey,
    lamports: number
  ) => Promise<void>;
}
interface BurnerWalletSaveable {
  keypair: string;
  signForMe: string;
  delegateeSigner: string;
}
interface BurnerWallet {
  keypair: Keypair;
  signForMe: PublicKey;
  delegateeSigner: PublicKey;
}

export const SmartWalletContext = React.createContext<ISmartWalletContext>(
  {} as any
);
export const useSmartWallet = () => useContext(SmartWalletContext);

const BURNER_WALLET_STORAGE_KEY = "burner_wallet";

export const SmartWalletProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [burnerWalletStored, setBurnerWalletStored] = useLocalStorage<
    BurnerWalletSaveable | undefined
  >(BURNER_WALLET_STORAGE_KEY, undefined);
  const [burnerWallet, setBurnerWallet] = React.useState<BurnerWallet>();
  const [burnerWalletBalance, setBurnerWalletBalance] =
    React.useState<number>(0);

  const [capabilities, setCapabilities] =
    React.useState<AccountInfoDeserialized<SignForMeAccount>[]>();
  const [delegatedSigners, setDelegatedSigners] =
    React.useState<AccountInfoDeserialized<SignForMeAccount>[]>();
  const network = React.useContext(NetworkContext);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(0);

  const reloadBurnerBalance = useCallback(async () => {
    if (burnerWallet) {
      setLoading(true);
      await connection.getLatestBlockhash("singleGossip");
      const balance = await connection.getBalance(
        burnerWallet.keypair.publicKey,
        "singleGossip"
      );
      setBurnerWalletBalance(balance / LAMPORTS_PER_SOL);
      setLoading(false);
    } else {
      setBurnerWalletBalance(undefined);
    }
  }, [connection, burnerWallet]);

  useEffect(() => {
    reloadBurnerBalance();
  }, [connection, burnerWallet]);

  const reload = useCallback(async (): Promise<void> => {
    if (!publicKey) {
      return;
    }
    let wasLoading = loading;
    setLoading(true);
    setCapabilities(await getSigningCapabilities(publicKey, connection));
    setDelegatedSigners(await getDelegatedSigners(publicKey, connection));
    if (!wasLoading) {
      setLoading(false);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (!burnerWalletStored) {
      return;
    }

    setBurnerWallet({
      delegateeSigner: new PublicKey(burnerWalletStored.delegateeSigner),
      signForMe: new PublicKey(burnerWalletStored.signForMe),
      keypair: Keypair.fromSecretKey(bs58.decode(burnerWalletStored.keypair)),
    });
  }, [burnerWalletStored]);

  useEffect(() => {
    reload();
  }, [connection, publicKey]);

  const selectionMemo = React.useMemo(
    () => ({
      burnerWallet,
      burnerWalletBalance,
      capabilities,
      loading,
      delegatedSigners,
      createBurnerWallet: async (scope: PublicKey, initialLamports: number) => {
        if (!!burnerWalletStored)
          throw new Error(
            "Wallet already exist: " +
              burnerWallet?.keypair.publicKey?.toString()
          );
        if (!scope) throw new Error("Missing scope");
        if (!publicKey) throw new Error("No wallet is connected");

        let key = Keypair.generate();
        let transaction = new Transaction();
        let [transactionSignForMe, signForMe] = await createSignForMe(
          publicKey,
          key.publicKey,
          scope,
          publicKey
        );
        transaction.add(transactionSignForMe);
        if (initialLamports > 0) {
          transaction.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: key.publicKey,
              lamports: initialLamports,
            })
          );
        }
        await sendTransaction(transaction, connection, {
          preflightCommitment: "max",
        });
        setBurnerWalletStored({
          delegateeSigner: publicKey.toBase58(),
          signForMe: signForMe.toBase58(),
          keypair: bs58.encode(key.secretKey),
        });
        await reload();
        await reloadBurnerBalance();
      },

      fillBurnerWallet: async (
        burnerWalletKey: PublicKey,
        lamports: number
      ) => {
        if (lamports <= 0) {
          return;
        }
        console.log(delegatedSigners);
        if (!delegatedSigners?.find((d) => !d.pubkey.equals(burnerWalletKey))) {
          throw new Error(
            "This burner wallet is not associated with your wallet"
          );
        }

        await sendTransaction(
          new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: burnerWallet.keypair.publicKey,
              lamports: lamports,
            })
          ),
          connection,
          {
            preflightCommitment: "max",
          }
        );

        await reloadBurnerBalance();
      },

      createSigner: async (signer: PublicKey, scope: PublicKey) => {
        setLoading(true);
        let [transaction, _signForMe] = await createSignForMe(
          publicKey,
          signer,
          scope,
          publicKey
        );
        const signature = await sendTransaction(
          new Transaction().add(transaction),
          connection
        );
        await connection.confirmTransaction(signature);
        await reload();
        setLoading(false);
      },
    }),
    [
      network.config.type,
      publicKey,
      burnerWalletBalance,
      delegatedSigners,
      capabilities,
      loading,
      session,
      burnerWalletStored,
    ]
  );

  return (
    <SmartWalletContext.Provider value={selectionMemo}>
      {children}
    </SmartWalletContext.Provider>
  );
};
 */