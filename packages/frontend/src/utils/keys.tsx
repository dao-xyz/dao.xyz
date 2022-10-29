import { Wallet } from "@dao-xyz/wallet-adapter-react";
import { PublicSignKey } from "@dao-xyz/peerbit-crypto";
import { useCallback, useMemo } from "react";
import bs58 from 'bs58';

export const usePublicKeyWalletToCopy = (
  publicKey: PublicSignKey | null,
  wallet: Wallet | null,
  children: React.ReactNode,
  setCopied: (copied: boolean) => any
) => {
  const base58 = useMemo(() => typeof publicKey != 'string' && !!publicKey ? bs58.encode(publicKey?.bytes) : publicKey, [publicKey]);
  const content = useMemo(() => {
    const bs58tring = base58 as string;
    if (children) return children;
    if (!wallet || !bs58tring) return null;
    return bs58tring.slice(0, 4) + ".." + (bs58tring).slice(-4);
  }, [children, wallet, base58]);
  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58 as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);
  return {
    base58,
    content,
    copyAddress,
  };
};

export const usePublicKeyToCopy = (
  publicKey: PublicSignKey | null,
  setCopied: (copied: boolean) => any
) => {
  const base58 = useMemo(() => publicKey ? bs58.encode(publicKey?.bytes) : undefined, [publicKey]);
  const content = useMemo(() => {
    if (!base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [, base58]);
  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);
  return {
    base58,
    content,
    copyAddress,
  };
};
