import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2F49D1",
    },
    secondary: {
      main: "#B6C1E9",
      contrastText: "#B9B9B9",
    },
    divider: "#ffffff",
    background: {
      default: "#f6f9ff",
    },
    success: {
      main: "#4BDE97",
    },

    warning: {
      main: "#FFB648",
    },
    danger: {
      main: "#F26464",
    },
    black: {
      main: "#000000",
    },
  },
});

export {  darkTheme };
