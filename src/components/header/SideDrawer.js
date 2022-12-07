import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { NavItems } from "./NavItems";

const SideDrawer = () => {
  const theme = useTheme();
  return (
    <List sx={{ mx: 1 }}>
      {NavItems.map((item, i) => {
        const Icon = item?.icon;
        return (
          <NavLink
            key={i}
            to={item?.path}
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "white" : "inherit",
                textDecoration: "none",
                backgroundColor: isActive && theme.palette.secondary.main,
                margin: "5px 0px",
              };
            }}
          >
            <ListItem
              sx={{ bgcolor: "inherit", m: "10px 0", p: 0, borderRadius: 2 }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Icon color="inherit" />
                </ListItemIcon>

                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
};

export default SideDrawer;
