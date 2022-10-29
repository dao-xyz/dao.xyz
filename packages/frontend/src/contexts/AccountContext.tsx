import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useConnection,
  useLocalStorage,
  useWallet,
} from "@dao-xyz/wallet-adapter-react";
export interface AccountState {
  balance: number | undefined;
  transactionEvent: () => void;
}

export const AccountContext = createContext<AccountState>({} as AccountState);

export function useAccount(): AccountState {
  return useContext(AccountContext);
}

export const AccountProvider: FC<any> = ({ children, ...props }) => {
  const [balance, setBalance] = useState<number | undefined>(0);
  const { publicKey } = useWallet();

  const state = useMemo<AccountState>(
    () => ({
      balance,
      transactionEvent: () => {
        updateTokenBalance();
      },
    }),
    [balance, publicKey]
  );
  const updateTokenBalance = useCallback(() => {
    /*  if (publicKey)
       connection.getBalance(publicKey).then((balance) => {
         setBalance(balance / LAMPORTS_PER_SOL);
       });
     else {
       setBalance(undefined);
     } */
  }, [publicKey]);
  useEffect(() => {
    updateTokenBalance();
  }, [publicKey]); // we should also have some change detection when transaction are done (balance will cahnge)

  return (
    <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
  );
};
