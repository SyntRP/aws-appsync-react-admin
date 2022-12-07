import { Box, Drawer, Toolbar } from "@mui/material";
import { DRAWER_WIDTH } from "../../constants";
import SideDrawer from "./SideDrawer";

const SideBar = (props) => {
  const { open, onClose, container } = props;
  return (
    <Box
      component="nav"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: { md: 0 },
      }}
      aria-label="admin folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            border: "none",
            boxShadow: "0px -9px 9px -3px rgba(251,251,251,0.74)",
          },
        }}
      >
        <Toolbar />
        <SideDrawer />
      </Drawer>
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            border: "none",
            boxShadow: "0px -9px 9px -3px rgba(251,251,251,0.74)",
          },
        }}
        open={open}
      >
        {/* <Toolbar /> */}

        <SideDrawer />
      </Drawer>
    </Box>
  );
};

export default SideBar;
