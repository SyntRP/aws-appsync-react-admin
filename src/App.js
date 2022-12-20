// import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Toolbar, useTheme } from "@mui/material";
import { Amplify, Auth } from "aws-amplify";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import AppSyncConfig from "./aws-exports";
import AWSAuthenticator from "./AWSAuthenticator";
import { Loader } from "./components/common/Loader";
import SideBar from "./components/header/SideBar";
import TopBar from "./components/header/TopBar";
import { DRAWER_WIDTH } from "./constants";
import { AdminProvider, useAdmin } from "./helpers/providers/AdminProvider";
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
  return (
    <AWSAuthenticator>
      <AdminProvider>
        <Layout />
      </AdminProvider>
    </AWSAuthenticator>
  );
};

export default App;

const Layout = () => {
  const theme = useTheme();
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <TopBar
        onClick={handleDrawerToggle}
        open={mobileOpen}
        signOut={signOut}
      />
      {isAdmin ? (
        <>
          <SideBar onClose={handleDrawerToggle} open={mobileOpen} />
          <div
            style={
              {
                // display: "flex",
              }
            }
          >
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                color: "text.primary",
                p: 1,
                width: {
                  md: mobileOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
                },
                ml: { md: mobileOpen ? `${DRAWER_WIDTH}px` : "auto" },
                mr: "auto",
                maxWidth: 1900,
                minHeight: `calc(100vh - ${60}px)`,
              }}
            >
              <Box
                sx={{
                  // display: "flex",
                  width: "100%",
                  borderRadius: 1,
                  px: 2,
                  height: "100%",
                }}
              >
                <Suspense fallback={<Loader />}>
                  <Outlet />
                </Suspense>
              </Box>
            </Box>
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
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
        </div>
      )}
    </>
  );
};
