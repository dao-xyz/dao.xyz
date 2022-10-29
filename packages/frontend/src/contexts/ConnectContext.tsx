import React, { createContext, useContext, useEffect, useState } from "react";
import NotReadyYetDialog from "../components/dialogs/NotReadyYetDialog";
import ConnectDialog from "../components/wallet/ConnectDialog";


interface IConnectContext {
    openConnect: () => void,
    closeConnect: () => void
}
export const ConnectContext = React.createContext<IConnectContext>({} as any);
export const useConnect = () => useContext(ConnectContext);

export const ConnectContextProvider = ({ children }: { children: JSX.Element }) => {
    const [openConnectDialog, setOpenConnectDialog] = React.useState(false);
    const memo = React.useMemo<IConnectContext>(
        () => ({

            closeConnect: () => {
                setOpenConnectDialog(false);
            },
            openConnect: () => {
                setOpenConnectDialog(true);
            }
        }),
        [openConnectDialog]
    );

    return (
        <ConnectContext.Provider value={memo}>
            {children}
            <ConnectDialog open={openConnectDialog} onClose={() => setOpenConnectDialog(false)} ></ConnectDialog>
        </ConnectContext.Provider>
    );
};
