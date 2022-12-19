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

import React, { lazy, Suspense, useState } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";

const ShareSurvey = lazy(() => import("../../components/surveys/ShareSurvey"));
const UpdateSurvey = lazy(() => import("./UpdateSurvey"));
const ViewSurvey = lazy(() => import("./ViewSurvey"));

const SurveyCard = ({ survey }) => {
  const {
    open: updateOpen,
    toggleOpen: updateToggleOpen,
    setOpen: setUpdateOpen,
  } = useToggle();
  const {
    open: viewOpen,
    toggleOpen: viewToggleOpen,
    setOpen: setViewOpen,
  } = useToggle();

  const {
    open: shareOpen,
    toggleOpen: shareToggleOpen,
    setOpen: setShareOpen,
  } = useToggle();

  const [currentSurvey, setCurrentSurvey] = useState({});
  console.log("currentSurvey", currentSurvey);
  const { image, name, description } = survey;

  const openUpdateDialog = Boolean(updateOpen) && Boolean(currentSurvey?.id);
  const openViewDialog = Boolean(viewOpen) && Boolean(currentSurvey?.id);
  const openShareDialog = Boolean(shareOpen) && Boolean(currentSurvey);

  const handleSurveyUpdateDialog = (survey) => {
    const { name = "", image = "", description = "", id } = survey;
    setCurrentSurvey({
      name,
      image,
      description,
      id,
    });
    setUpdateOpen(true);
  };
  const handleSurveyViewDialog = (survey) => {
    setCurrentSurvey(survey);
    setViewOpen(true);
  };
  const handleSurveyShareDialog = (survey) => {
    setCurrentSurvey(survey?.preQuestionnaire?.id);
    setShareOpen(true);
  };
  const handleupdateToggleOpen = () => {
    setCurrentSurvey({});
    updateToggleOpen();
  };
  const handleViewToggleOpen = () => {
    setCurrentSurvey({});
    viewToggleOpen();
  };
  const handleShareToggleOpen = () => {
    setCurrentSurvey({});
    shareToggleOpen();
  };
  return (
    <>
      <DynamicModel
        dialogTitle="Share Survey"
        open={openShareDialog}
        toggle={handleShareToggleOpen}
        isClose
        maxWidth="sm"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <ShareSurvey
            toggle={handleShareToggleOpen}
            currentSurveyId={currentSurvey}
          />
        </Suspense>
      </DynamicModel>
      <DynamicModel
        open={openUpdateDialog}
        toggle={handleupdateToggleOpen}
        dialogTitle={`Update Survey ${currentSurvey?.name}`}
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <UpdateSurvey
            toggle={handleupdateToggleOpen}
            initialFormValues={currentSurvey}
          />
        </Suspense>
      </DynamicModel>

      <DynamicModel
        open={openViewDialog}
        toggle={handleViewToggleOpen}
        dialogTitle={`View Survey `}
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <ViewSurvey
            toggle={handleViewToggleOpen}
            currentSurveyData={currentSurvey}
          />
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
          <Button
            size="small"
            variant="contained"
            onClick={() => handleSurveyUpdateDialog(survey)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleSurveyViewDialog(survey)}
          >
            Preview
          </Button>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => handleSurveyShareDialog(survey)}
          >
            <ShareOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default SurveyCard;
