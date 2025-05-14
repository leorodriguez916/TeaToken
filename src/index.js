import "@fontsource/source-code-pro";
import "@fontsource/roboto";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  tea: {
    dark: "#004002",
    green: "#556b2f",
    matcha: "#a9a454",
    orchid: "#DA70D6",
    light: { 50: "#F3F3F2", 100: "#f8f4ed", 200: "#efe4d4" },
    brown: "#b07946",
  },
};

const globalStyles = {
  styles: {
    global: {
      body: {
        bg: "tea.light.50",
      },
      "html, body": {
        color: "tea.dark",
      },
    },
  },
};

const teaTheme = extendTheme({
  colors,
  ...globalStyles,
  fonts: {
    heading: "Source Code Pro, monospace",
    body: "Source Code Pro, sans-serif",
  },
});

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  <ChakraProvider theme={teaTheme}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
