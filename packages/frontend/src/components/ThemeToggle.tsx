import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button, ListItemIcon, MenuItem } from "@mui/material";
export default function ThemeToggle(props: { menuItem?: boolean }) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box>
      {!props.menuItem ? (
        <IconButton
          sx={{ ml: 1, mr: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      ) : (
        <MenuItem onClick={colorMode.toggleColorMode} color="inherit">
          <ListItemIcon>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </ListItemIcon>
          Theme
        </MenuItem>
      )}
    </Box>
  );
}
