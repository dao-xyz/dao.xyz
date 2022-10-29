import React, { createContext, useContext, useEffect, useState } from "react";
import NotReadyYetDialog from "../components/dialogs/NotReadyYetDialog";


interface IFeatureContext {
    openNotReady: () => void,
    closeNotReady: () => void
}
export const FeatureContext = React.createContext<IFeatureContext>({} as any);
export const useFeatures = () => useContext(FeatureContext);

export const FeatureProvider = ({ children }: { children: JSX.Element }) => {
    const [openNotReady, setOpenNotReady] = React.useState(false);
    const memo = React.useMemo<IFeatureContext>(
        () => ({

            closeNotReady: () => {
                setOpenNotReady(false);
            },
            openNotReady: () => {
                setOpenNotReady(true);
            }
        }),
        [openNotReady]
    );


    return (
        <FeatureContext.Provider value={memo}>
            {children}
            <NotReadyYetDialog open={openNotReady} onClose={() => setOpenNotReady(false)} ></NotReadyYetDialog>
        </FeatureContext.Provider>
    );
};
