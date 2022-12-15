import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const CreateCard = ({ title = "Add", onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: "pointer" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <IconButton
          aria-label="add"
          sx={{
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AddCircleOutlineOutlinedIcon sx={{ height: "45%", width: 90 }} />
        </IconButton>
        <Typography textAlign="center" variant="h6">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CreateCard;
