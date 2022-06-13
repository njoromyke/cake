import { ThemeProvider } from "@emotion/react";
import {  CssBaseline, Grid } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { darkTheme } from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Grid container>
        <Grid item xs={12}>
          <Router>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
