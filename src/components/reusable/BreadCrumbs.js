import { Breadcrumbs, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const BreadCrumbs = () => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ mb: 1 }}
      separator={<NavigateNextOutlinedIcon fontSize="small" />}
    >
      <MUILink underline="none" color="inherit" href="/" component={Link}>
        <HomeOutlinedIcon sx={{ mr: 0.5, pt: 0.5 }} fontSize="medium" />
      </MUILink>
      <MUILink underline="none" color="inherit" href="/" component={Link}>
        Home
      </MUILink>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
