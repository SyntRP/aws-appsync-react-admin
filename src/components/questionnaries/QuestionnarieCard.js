import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import useToggle from "../../helpers/hooks/useToggle";
import DynamicModel from "../reusable/DynamicModel";
import DeleteModel from "../reusable/DeleteModel";
import { Link } from "react-router-dom";

const QuestionnarieCard = ({ questionnarie }) => {
  const { name, description } = questionnarie;
  const {
    open: editQuestionnaireModelOpen,
    setOpen: setEditQuestionnaireModelOpen,
    toggleOpen: toggleEditQuestionnaireModelOpen,
  } = useToggle(false);
  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggledeleteModelOpen,
  } = useToggle(false);
  return (
    <>
      <DynamicModel
        open={editQuestionnaireModelOpen}
        toggle={toggleEditQuestionnaireModelOpen}
        dialogTitle="Edit Questionnaire"
        confirmText="UPDATE"
        cancelText="CANCEL"
      >
        <DialogContent>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Name"
            // value={name}
            // onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            // value={description}
            // onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="introMsg"
            label="Intro Message"
            // value={introMsg}
            // onChange={(event) => setInstroMsg(event.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="endMsg"
            label="Thank You Message"
            // value={endMsg}
            // onChange={(event) => setEndMsg(event.target.value)}
            fullWidth
          />
          <br />
        </DialogContent>
      </DynamicModel>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggledeleteModelOpen}
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

          <Button
            size="small"
            variant="contained"
            onClick={setEditQuestionnaireModelOpen}
          >
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
          {/* <IconButton aria-label="share">
          <ShareOutlinedIcon />
        </IconButton> */}
        </CardActions>
      </Card>
    </>
  );
};

export default QuestionnarieCard;
