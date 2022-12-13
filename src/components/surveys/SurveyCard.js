import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardHeader,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DynamicModel from "../reusable/DynamicModel";

const SurveyCard = ({ survey }) => {
  const { image, name, description, id } = survey;

  return (
    <>
      <Card
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="delete" sx={{ color: red[500] }}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="100"
          src={image}
          alt="Survey Logo"
          sx={{ p: 0.5, objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton color="primary" aria-label="archive">
            <ArchiveOutlinedIcon />
          </IconButton>
          <Button size="small" variant="contained">
            Edit
          </Button>
          <Button size="small" variant="contained" color="secondary">
            Preview
          </Button>
          <IconButton color="primary" aria-label="delete">
            <ShareOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default SurveyCard;
