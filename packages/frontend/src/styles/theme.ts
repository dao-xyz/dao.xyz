/* export const lightTheme: ThemeInterface = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
}
  
export const darkTheme: ThemeInterface = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
}


export  interface ThemeInterface {
    body: string,
    text: string,
    toggleBorder: string,
    gradient: string,
} */

import { createTheme, PaletteMode, ThemeOptions } from "@mui/material";
import {
  amber,
  blue,
  orange,
  deepOrange,
  lime,
  grey,
  lightBlue,
  lightGreen,
  green,
  yellow,
  teal,
  indigo,
  blueGrey
} from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({

  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        primary: blue,
        secondary: orange,
        /*  divider: blue[200], */
        text: {
          primary: grey[900],
          secondary: grey[800],
        }
      }
      : {
        // palette values for dark mode
        primary: lightBlue,
        secondary: orange,
        /*   divider: lightBlue[200], */
        text: {
          primary: grey[100],
          secondary: grey[500],
        },
      }),
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
  },
});
