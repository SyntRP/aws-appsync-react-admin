import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Amplify, Auth } from "aws-amplify";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppSyncConfig from "./aws-exports";
import SideBar from "./components/header/SideBar";
import TopBar from "./components/header/TopBar";
import { DRAWER_WIDTH } from "./constants";
import { useAdmin } from "./helpers/providers/AdminProvider";
import DashboardPage from "./pages/Dashboard";
import SurveysPage from "./pages/Surveys";
Amplify.configure(AppSyncConfig);

const signOut = () => {
  Auth.signOut({ global: true })
    .then((data) => {
      console.log("SignOut");
    })
    .catch((err) => {
      console.log("SignOut error : " + err);
    });
};

const App = () => {
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      <TopBar
        onClick={handleDrawerToggle}
        open={mobileOpen}
        signOut={signOut}
      />
      {isAdmin ? (
        <>
          <SideBar onClose={handleDrawerToggle} open={mobileOpen} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 1,
              width: {
                md: mobileOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
              },
              ml: { md: mobileOpen ? `${DRAWER_WIDTH}px` : "auto" },
              mr: "auto",
              maxWidth: 1600,
            }}
          >
            <Toolbar />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                bgcolor: "background.default",
                color: "text.primary",
                borderRadius: 1,
                p: 1,
              }}
            >
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/surveys" element={<SurveysPage />} />
              </Routes>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            width: "100%",
          }}
        >
          <Toolbar />
          <p style={{ textAlign: "center" }}>You are not an Admin</p>
        </Box>
      )}
    </BrowserRouter>
  );
};

export default withAuthenticator(App);
