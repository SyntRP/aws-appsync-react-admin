import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { DRAWER_WIDTH } from "../../constants";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAdmin } from "../../helpers/providers/AdminProvider";

const TopBar = ({ signOut, open, onClick }) => {
  const { isAdmin } = useAdmin();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        width: { md: open ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
        ml: { md: open ? `${DRAWER_WIDTH}px` : 0 },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
        // maxWidth: 1600,
        left: 0,
      }}
    >
      <Toolbar
        sx={{
          bgcolor: "background.paper",
          boxShadow: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onClick}
            sx={{
              mr: 2,
              // display: { md: "none" }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Stonemor
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ThemeToggle />
          {isAdmin && (
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  My Profile
                </MenuItem>
                <MenuItem component={Link} to="/settings" onClick={handleClose}>
                  Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
