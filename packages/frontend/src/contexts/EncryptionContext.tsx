import React, { createContext, FC, useContext, useMemo } from "react";
import { Encrypter } from "../helpers/encrypter";

export interface EncryptionContextState {
  hashedPassword: string | undefined;
  setPassword(password: string): Promise<void>;
  checkPassword(password: string, hash: string): Promise<boolean>;
  encrypt(string: string, password: string): string;
  decrypt(string: string, password: string): string;
}

export const PasswordContext = createContext<EncryptionContextState>(
  {} as EncryptionContextState
);

export function useEncryption(): EncryptionContextState {
  return useContext(PasswordContext);
}
export const hash = async (string: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
};

export const EncryptionProvider: FC<any> = ({ children }) => {
  const [hashedPassword, setHashedPassword] = React.useState<
    string | undefined
  >(undefined);
  const state = useMemo<EncryptionContextState>(
    () => ({
      hashedPassword,
      setPassword: async (password: string) =>
        setHashedPassword(await hash(password)),
      checkPassword: async (password: string) =>
        !hash || (await hash(password)) === hashedPassword,
      decrypt: (string: string, password: string) =>
        new Encrypter(password).decrypt(string),
      encrypt: (string: string, password: string) =>
        new Encrypter(password).encrypt(string),
    }),
    [hashedPassword]
  );
  return (
    <PasswordContext.Provider value={state}>
      {children}
    </PasswordContext.Provider>
  );
};
