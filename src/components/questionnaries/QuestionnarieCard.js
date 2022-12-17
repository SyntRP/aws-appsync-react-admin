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
import { DELETE_QUESTONNAIRE } from "../../graphql/custom/mutations";
import { useMutation } from "@apollo/client";
import withSuspense from "../../helpers/hoc/withSuspense";
import { Loader } from "@aws-amplify/ui-react";
import { lazy, Suspense } from "react";

const EditQuestionnaire = lazy(() => import("./EditQuestionnaire"));

const QuestionnarieCard = ({ questionnarie }) => {
  const { name, description } = questionnarie;
  const { open, toggleOpen } = useToggle();

  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggledeleteModelOpen,
  } = useToggle(false);

  const [DeleteQuestionnaire] = useMutation(DELETE_QUESTONNAIRE, {
    id: questionnarie?.id,
  });
  const onClickDelete = async () => {
    await DeleteQuestionnaire({ id: questionnarie?.id });
    setDeleteModelOpen(false);
  };

  return (
    <>
      <DynamicModel
        dialogTitle="Edit Questionnaire"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <EditQuestionnaire toggle={toggleOpen}/>
        </Suspense>
      </DynamicModel>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggledeleteModelOpen}
        onClickConfirm={onClickDelete}
        dialogTitle="Delete this Questionnaire"
        dialogContentText="Are You Sure You Want to Delete this Questionnaire?"
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
            <IconButton aria-label="delete" onClick={setDeleteModelOpen}>
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

          <Button size="small" variant="contained" onClick={toggleOpen}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            component={Link}
            to={`/questionnariesquestion/${questionnarie.id}`}
          >
            Preview
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default withSuspense(QuestionnarieCard);
