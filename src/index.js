import React, { lazy } from "react";
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

const QuestionnariesQuestionPage = lazy(() =>
  import("./pages/QuestionnariesQuestion")
);
const TestResponsesPage = lazy(() => import("./pages/TestResponses"));
const SurveyResponsesPage = lazy(() => import("./pages/SurveyResponses"));
const SurveyEntriesPage = lazy(() => import("./pages/SurveyEntries"));
const ArchivedPage = lazy(() => import("./pages/Archived"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<DashboardPage />} />
      <Route path="surveys" element={<SurveysPage />} />
      <Route path="questionnaries" element={<QuestionnariesPage />} />
      <Route
        path="questionnaries/:id"
        element={<QuestionnariesQuestionPage />}
      />
      <Route path="users" element={<UsersPage />} />
      <Route path="locations" element={<LocationsPage />} />
      {/* <Route path="qrcoderesponses" element={<QrCodeResponsesPage />} /> */}
      {/* <Route path="linkresponses" element={<LinkResponsesPage />} /> */}
      {/* <Route path="testresponses" element={<TestResponsesPage />} /> */}
      <Route path="surveyEntries/:id" element={<SurveyResponsesPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="surveyEntries" element={<SurveyEntriesPage />} />
      <Route path="archived" element={<ArchivedPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ColorModeContextProvider>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </ColorModeContextProvider>
  </ApolloProvider>
);
