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
import DeleteModel from "../reusable/DeleteModel";
import React, { lazy, Suspense, useState } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const ViewSurvey = lazy(() => import("../surveys/ViewSurvey"));
const UnarchiveSurvey = lazy(() => import("./UnarchiveSurvey"));

const ArchiveCard = ({ survey }) => {
  const {
    open: viewOpen,
    toggleOpen: viewToggleOpen,
    setOpen: setViewOpen,
  } = useToggle();

  const {
    open: archivedOpen,
    toggleOpen: archivedToggleOpen,
    setOpen: setArchivedOpen,
  } = useToggle();

  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggleDeleteModelOpen,
  } = useToggle(false);

  const [currentSurvey, setCurrentSurvey] = useState({});
  const { image, name, description } = survey;

  const openViewDialog = Boolean(viewOpen) && Boolean(currentSurvey?.id);
  const openArchivedDialog =
    Boolean(archivedOpen) && Boolean(currentSurvey?.id);

  const handleSurveyViewDialog = (survey) => {
    setCurrentSurvey(survey);
    setViewOpen(true);
  };
  const handleSurveyDeleteDialog = (survey) => {
    setCurrentSurvey(survey);
    setDeleteModelOpen(true);
  };
  const handleSurveyArchivedDialog = (survey) => {
    setCurrentSurvey(survey);
    setArchivedOpen(true);
  };

  const handleViewToggleOpen = () => {
    setCurrentSurvey({});
    viewToggleOpen();
  };

  const handleArchivedToggleOpen = () => {
    setCurrentSurvey({});
    archivedToggleOpen();
  };
  return (
    <>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggleDeleteModelOpen}
        //  onClickConfirm={onClickDelete}
        dialogTitle="Delete "
        dialogContentText={`Are You Sure You Want to Delete ${currentSurvey?.name} survey?`}
      />

      <DynamicModel
        dialogTitle={` Survey - ${currentSurvey?.name}`}
        open={openArchivedDialog}
        toggle={handleArchivedToggleOpen}
        isClose
        maxWidth="sm"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <UnarchiveSurvey
            toggle={handleArchivedToggleOpen}
            currentSurveyData={currentSurvey}
          />
        </Suspense>
      </DynamicModel>

      <DynamicModel
        open={openViewDialog}
        toggle={handleViewToggleOpen}
        dialogTitle={`View Archived Survey `}
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
            <IconButton
              aria-label="delete"
              onClick={() => handleSurveyDeleteDialog(survey)}
            >
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
          {survey?.preQuestionnaire?.id && (
            <IconButton
              color="primary"
              aria-label="archive"
              onClick={() => handleSurveyArchivedDialog(survey)}
            >
              <UnarchiveOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            color="primary"
            aria-label="archive"
            onClick={() => handleSurveyViewDialog(survey)}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ArchiveCard;
