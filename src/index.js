import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App";
import client from "./client";
import { AdminProvider } from "./helpers/providers/AdminProvider";
import ColorModeContextProvider from "./Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    {/* <AdminProvider> */}
    <ColorModeContextProvider>
      <App />
    </ColorModeContextProvider>
    {/* </AdminProvider> */}
  </ApolloProvider>
);
