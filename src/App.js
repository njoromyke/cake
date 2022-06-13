import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { darkTheme } from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Grid container>
        <Grid item xs={12}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
