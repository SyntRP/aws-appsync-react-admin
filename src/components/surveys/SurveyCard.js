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

import React, { lazy, Suspense } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";

const ShareSurvey = lazy(() => import("../../components/surveys/ShareSurvey"));

const SurveyCard = ({ survey }) => {
  const { image, name, description, id } = survey;
  const { open, toggleOpen } = useToggle();

  return (
    <>
      <DynamicModel
        dialogTitle="Share Survey"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="sm"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <ShareSurvey toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>

      <Card
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="delete">
              <DeleteForeverOutlinedIcon color="error" />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="70"
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
          <IconButton color="primary" aria-label="delete" onClick={toggleOpen}>
            <ShareOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default SurveyCard;
