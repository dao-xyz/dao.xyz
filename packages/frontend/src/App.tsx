import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "./styles/theme";
import Box from "@mui/material/Box";
/* import { Network } from "./contexts/Network";*/
import { UserProvider } from "./contexts/UserContext";
import { AlertProvider } from "./contexts/AlertContext";
import { AccountProvider } from "./contexts/AccountContext";
import ContentOutlet from "./pages/channel/ContentOutlet";
import { PostsProvider } from "./contexts/PostContext";
import { FeatureProvider } from "./contexts/FeatureContext";
import { PeerProvider } from "./contexts/PeerContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { WalletProvider } from "@dao-xyz/wallet-adapter-react";
import { ConnectContextProvider } from "./contexts/ConnectContext";
import { MetaMaskWalletAdapter, PhantomWalletAdapter } from "@dao-xyz/wallet-adapter-wallets";
export const ColorModeContext = React.createContext({
  toggleColorMode: () => { }, // For some reason this should just be like this
});
const drawerWidth = 250;
window.Buffer = window.Buffer || require("buffer").Buffer;


function App() {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const wallets = useMemo(
    () => [
      new MetaMaskWalletAdapter(),
      new PhantomWalletAdapter()
    ],
    []
  );


  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  //const [theme, setTheme] = useState(lightTheme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <HashRouter basename="/">
          <CssBaseline>
            <AlertProvider>

              <ConfigProvider>
                <WalletProvider wallets={wallets} autoConnect={true}>
                  <ConnectContextProvider>
                    <PeerProvider>
                      <AccountProvider>
                        <UserProvider>
                          <PostsProvider>
                            <FeatureProvider>
                              <Box className="column" sx={{ width: "100%" }}>
                                <ContentOutlet />

                              </Box>
                            </FeatureProvider>
                          </PostsProvider>
                        </UserProvider>
                      </AccountProvider>
                    </PeerProvider>
                  </ConnectContextProvider>
                </WalletProvider>
              </ConfigProvider>
            </AlertProvider>

          </CssBaseline>
        </HashRouter>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}
export default App;
