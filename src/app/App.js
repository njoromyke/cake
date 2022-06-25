import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContextProvider } from "../context/CartContext";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import { darkTheme } from "../utils/theme";
import ProtectedRoutes from "./routes/protected-routes";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CartContextProvider>
        <UserAuthContextProvider>
          <Grid container>
            <Grid item xs={12}>
              <ToastContainer />
              <ProtectedRoutes />
            </Grid>
          </Grid>
        </UserAuthContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
};

export default App;
