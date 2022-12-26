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
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import useToggle from "../../helpers/hooks/useToggle";
import DynamicModel from "../reusable/DynamicModel";
import DeleteModel from "../reusable/DeleteModel";
import { Link } from "react-router-dom";
import {
  DELETE_QUESTONNAIRE,
  UPDATE_QUESTIONNAIRE,
} from "../../graphql/custom/mutations";
import { useMutation } from "@apollo/client";
import withSuspense from "../../helpers/hoc/withSuspense";
import { Loader } from "@aws-amplify/ui-react";
import { lazy, Suspense, useState } from "react";
import { LIST_QUESTIONNARIES } from "../../graphql/custom/queries";

const EditQuestionnaire = lazy(() => import("./EditQuestionnaire"));

const QuestionnarieCard = ({ questionnarie }) => {
  const { name, description } = questionnarie;
  const [currentQuestionnarie, setCurrentQuestionnarie] = useState({});

  const {
    open: updateOpen,
    toggleOpen: updateToggleOpen,
    setOpen: setUpdateOpen,
  } = useToggle();
  const openUpdateDialog =
    Boolean(updateOpen) && Boolean(currentQuestionnarie?.id);
  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggleDeleteModelOpen,
  } = useToggle(false);

  const [deleteQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE, {
    refetchQueries: [
      {
        query: LIST_QUESTIONNARIES,
        variables: {
          filter: { archived: { ne: true }, deleted: { ne: true } },
        },
      },
    ],
  });

  const handleQuestionnarieDeleteDialog = (questionnarie) => {
    const { id, name } = questionnarie;
    setCurrentQuestionnarie({
      id,
      name,
    });
    setDeleteModelOpen(true);
  };

  const handleQuestionnarieUpdateDialog = (questionnarie) => {
    const {
      name = "",
      description = "",
      introMsg = "",
      endMsg = "",
      id,
    } = questionnarie;
    setCurrentQuestionnarie({
      name,
      description,
      introMsg,
      endMsg,
      id,
    });
    setUpdateOpen(true);
  };
  const handleupdateToggleOpen = () => {
    setCurrentQuestionnarie({});
    updateToggleOpen();
  };
  const onClickDelete = async () => {
    const DeleteQuery = {
      id: currentQuestionnarie?.id,
      deleted: true,
    };
    await deleteQuestionnaire({ variables: { input: DeleteQuery } });
    toggleDeleteModelOpen();
  };

  return (
    <>
      <DynamicModel
        dialogTitle={`Update Questionnaire - ${currentQuestionnarie?.name}`}
        open={openUpdateDialog}
        toggle={handleupdateToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <EditQuestionnaire
            toggle={handleupdateToggleOpen}
            initialFormValues={currentQuestionnarie}
          />
        </Suspense>
      </DynamicModel>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggleDeleteModelOpen}
        onClickConfirm={onClickDelete}
        dialogTitle={`Delete this - ${currentQuestionnarie?.name}`}
        dialogContentText={`Are You Sure You Want to Delete ${currentQuestionnarie?.name}?`}
      />
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
            <IconButton
              aria-label="delete"
              onClick={() => handleQuestionnarieDeleteDialog(questionnarie)}
            >
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
          {/* <IconButton aria-label="archieve">
            <ArchiveOutlinedIcon />
          </IconButton> */}

          <Button
            size="small"
            variant="contained"
            onClick={() => handleQuestionnarieUpdateDialog(questionnarie)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            component={Link}
            to={`/questionnaries/${questionnarie.id}`}
          >
            Preview
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default withSuspense(QuestionnarieCard);
