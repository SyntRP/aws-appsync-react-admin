import { Fab } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const CreateButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
      }}
      onClick={onClick}
    >
      <AddCircleOutlineOutlinedIcon />
    </Fab>
  );
};

export default CreateButton;
