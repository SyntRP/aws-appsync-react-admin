import {
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import withSuspense from "../../helpers/hoc/withSuspense";
import CreateCard from "../reusable/CreateCard";
import QuestionnarieCard from "./QuestionnarieCard";
import useToggle from "../../helpers/hooks/useToggle";
import DynamicModel from "../reusable/DynamicModel";

const Questionnaries = ({ questionnaires }) => {
  const {
    open: createQuestionnaireModelOpen,
    setOpen: setCreateQuestionnaireModelOpen,
    toggleOpen: toggleCreateQuestionnaireModelOpen,
  } = useToggle(false);

  return (
    <div>
      <DynamicModel
        open={createQuestionnaireModelOpen}
        toggle={toggleCreateQuestionnaireModelOpen}
        dialogTitle="Create Questionnaire"
        confirmText="CREATE"
        cancelText="CANCEL"
      >
        <DialogContent>
          <DialogContentText>
            To create a new Questionnaire, please complete the following
            details.
          </DialogContentText>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Name"
            // value={name}
            // onChange={(event) => onNameChange(event.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            // value={description}
            // onChange={(event) => onDescriptionChange(event.target.value)}
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
          <FormControl fullWidth>
            <InputLabel>Survey</InputLabel>
            <Select
              margin="dense"
              fullWidth
              // value={survey}
              // onChange={(event) => onSurveyChange(event.target.value)}
            >
              {/* {listSurveys
                    ? listSurveys.items.map((survey, s) => (
                        <MenuItem key={s} value={survey.id}>
                          {survey.name}
                        </MenuItem>
                      ))
                    : null} */}
            </Select>
          </FormControl>
          <br />
        </DialogContent>
      </DynamicModel>
      {questionnaires.length > 0 ? (
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} cm={6} md={4}>
            <CreateCard
              title="Create Questionnarie"
              onClick={setCreateQuestionnaireModelOpen}
            />
          </Grid>
          {questionnaires.map((questionnarie, i) => (
            <Grid item xs={12} cm={6} md={4} key={i}>
              <QuestionnarieCard
                questionnarie={questionnarie}
                sx={{ height: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No Questionnaries found</p>
      )}
    </div>
  );
};

export default withSuspense(Questionnaries);
