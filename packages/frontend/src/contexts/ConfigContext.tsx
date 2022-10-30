import React, { useContext, useEffect } from "react";
import { createRootPosts, Posts } from 'pear2pear';

interface Config {
    posts: Posts,
    replicationTopic: string
}


interface IConfigContext {
    config: Config
}
export const ConfigContext = React.createContext<IConfigContext>({} as any);
export const useConfig = () => useContext(ConfigContext);
export const ConfigProvider = ({ children }: { children: JSX.Element }) => {
    const [config, setConfig] = React.useState<Config>({ posts: createRootPosts(), replicationTopic: 'world' });
    const memo = React.useMemo<IConfigContext>(
        () => ({
            config
        }),
        [config]
    );

    return (
        <ConfigContext.Provider value={memo}>
            {children}
        </ConfigContext.Provider>
    );
};
