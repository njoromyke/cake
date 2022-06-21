import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import { CartContextProvider } from "../context/CartContext";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import { darkTheme } from "../utils/theme";
import ProtectedRoutes from "./routes/protected-routes";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CartContextProvider>
        <UserAuthContextProvider>
          <ToastContainer />
          <Grid container>
            <Grid item xs={12}>
              <ProtectedRoutes />
            </Grid>
          </Grid>
        </UserAuthContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
};

export default App;
