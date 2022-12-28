import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  CREATE_QUESTIONNAIRE,
  UPDATE_SURVEY,
} from "../../graphql/custom/mutations";
import {
  LIST_QUESTIONNARIES,
  LIST_SURVEYS,
} from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const initialFormValues = {
  name: "",
  description: "",
  type: "PRE",
  introMsg: "Welcome to StoneMor Suvey. Click continue to attend survey.",
  endMsg:
    "Thank you for completing our survey. If you have requested a follow up,someone will be in touch with you soon.",
};
const CreateQuestionnarie = ({ toggle, questionnaire }) => {
  const { data } = useQuery(LIST_SURVEYS);

  const [createQuestionnaire] = useMutation(CREATE_QUESTIONNAIRE);
  const [updateSurvey , {loading}] = useMutation(UPDATE_SURVEY, {
    refetchQueries: [
      {
        query: LIST_QUESTIONNARIES,
        variables: {
          filter: { archived: { ne: true }, deleted: { ne: true } },
        },
      },
    ],
  });
  const { values, handleInputChange } = useForm(initialFormValues);
  const [surveyId, setSurveyId] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [questionnaireDup, setQuestionnaireDup] = useState("");

  const handleChangeName = (e) => {
    handleInputChange(e);
    setDuplicate(false);
  };

  const QuestionnaireEntries = async (qname) => {
    let findEntries = questionnaire?.find((s) => s?.name.toLowerCase() === qname.toLowerCase());
    if (findEntries) {
      return true;
    } else {
      return false;
    }
  };
  const enableButton =
    Boolean(values.name) &&
    Boolean(values.description) &&
    Boolean(values.introMsg) &&
    Boolean(values.endMsg) &&
    Boolean(surveyId);

  const handleSurveyChange = (e) => {
    setSurveyId(e.target.value);
  };

  const onClickCreate = async () => {
    let dup = await QuestionnaireEntries(values.name);
    if (dup) {
      setDuplicate(true);
      setQuestionnaireDup(
        `${values.name} already Exists. Give another QuestionnaireName `
      );
    } else{
      const res = await createQuestionnaire({ variables: { input: values } });
      const { data } = res;
      if (data.createQuestionnaire) {
        const surveyData = {
          id: surveyId,
          surveyPreQuestionnaireId: data?.createQuestionnaire?.id,
        };
        await updateSurvey({ variables: { input: surveyData } });
        toggle();
      }
    }
  };

  return (
    <Box>
      <p>
        To create a new Questionnaire, please complete the following details.
      </p>
      {duplicate ? <Alert severity="error">{questionnaireDup}</Alert> : null}
      <Grid justifyContent="center" my={1}>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            variant="standard"
            color="secondary"
            value={values.name}
            onChange={handleChangeName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            variant="standard"
            color="secondary"
            value={values.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            margin="dense"
            id="introMsg"
            name="introMsg"
            label="Intro Message"
            variant="standard"
            color="secondary"
            value={values.introMsg}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            margin="dense"
            id="endMsg"
            name="endMsg"
            label="Thank You Message"
            variant="standard"
            color="secondary"
            value={values.endMsg}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Link survey</InputLabel>
            <Select
              margin="dense"
              fullWidth
              variant="standard"
              color="secondary"
              value={surveyId}
              onChange={handleSurveyChange}
            >
              {data?.listSurveys?.items
                ?.slice()
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                ?.map((survey, s) => (
                  <MenuItem key={s} value={survey?.id}>
                    {survey.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button onClick={toggle} variant="text" color="info">
          Close
        </Button>
        {!loading ? (
          <Button
            onClick={onClickCreate}
            variant="contained"
            color="primary"
            disabled={!enableButton}
          >
            Create
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            Creating ....
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default withSuspense(CreateQuestionnarie);
