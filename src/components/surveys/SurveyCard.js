import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const SurveyCard = ({ survey }) => {
  const { image, name, description } = survey;
  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <CardMedia
        component="img"
        height="140"
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
          justifyContent: "center",
        }}
      >
        <Button size="small" variant="contained">
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Preview
        </Button>
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
