import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App";
import client from "./client";
import ColorModeContextProvider from "./Theme";
import DashboardPage from "./pages/Dashboard";
import SurveysPage from "./pages/Surveys";
import AnalyticsPage from "./pages/Analytics";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<DashboardPage />} />
      <Route path="surveys" element={<SurveysPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ColorModeContextProvider>
      <RouterProvider router={router} />
    </ColorModeContextProvider>
  </ApolloProvider>
);
