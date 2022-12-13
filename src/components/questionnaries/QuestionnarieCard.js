import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
const QuestionnarieCard = ({ questionnarie }) => {
  const { name, description } = questionnarie;

  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="questionarrie starts with"
            sx={{
              backgroundColor: "secondary.main",
            }}
          >
            {name?.charAt(0)?.toUpperCase() || "S"}
          </Avatar>
        }
        action={
          <IconButton aria-label="delete">
            <DeleteForeverOutlinedIcon color="error" />
          </IconButton>
        }
        title={name}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: 1,
          display: "flex",
          //   flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <IconButton aria-label="archieve">
          <ArchiveOutlinedIcon />
        </IconButton>

        <Button size="small" variant="contained">
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Preview
        </Button>
        <IconButton aria-label="share">
          <ShareOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default QuestionnarieCard;
