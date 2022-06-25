import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7b1fa2" },
    secondary: {
      main: "#212121",
    },
    background: {
      default: "#e1E2e1",
      paper: "#f5f5f6",
    },
  },
});

export { darkTheme };
