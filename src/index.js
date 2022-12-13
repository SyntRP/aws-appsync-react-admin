import React, { lazy, Suspense } from "react";
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
import { Loader } from "./components/common/Loader";
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const SurveysPage = lazy(() => import("./pages/Surveys"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const QuestionnariesPage = lazy(() => import("./pages/Questionnaries"));
const UsersPage = lazy(() => import("./pages/Users"));
const LocationsPage = lazy(() => import("./pages/Locations"));
const QrCodeResponsesPage = lazy(() => import("./pages/QrCodeResponses"));
const LinkResponsesPage = lazy(() => import("./pages/LinkResponses"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<DashboardPage />} />
      <Route path="surveys" element={<SurveysPage />} />
      <Route path="questionnaries" element={<QuestionnariesPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="locations" element={<LocationsPage />} />
      <Route path="qrcoderesponses" element={<QrCodeResponsesPage />} />
      <Route path="linkresponses" element={<LinkResponsesPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ColorModeContextProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} fallbackElement={<Loader />} />
      </Suspense>
    </ColorModeContextProvider>
  </ApolloProvider>
);
