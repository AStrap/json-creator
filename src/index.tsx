import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./assets/scss/main.scss";

const theme: Theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: "0.8em 0",
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
