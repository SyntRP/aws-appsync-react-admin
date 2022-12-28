import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import {
  UPDATE_QUESTIONNAIRE,
  UPDATE_SURVEY,
} from "../../graphql/custom/mutations";
import {
  LIST_QUESTIONNARIES,
  LIST_SURVEYS,
} from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const EditQuestionnaire = ({ toggle, initialFormValues }) => {
  const { values, handleInputChange } = useForm(initialFormValues);
  const { data } = useQuery(LIST_SURVEYS);
  const currentSurvey = data?.listSurveys?.items?.find(
    (item) => item?.preQuestionnaire?.id === values?.id
  );
  const [surveyId, setSurveyId] = useState(currentSurvey?.preQuestionnaire?.id);
  const [UpdateQuestionnaire, { loading }] = useMutation(UPDATE_QUESTIONNAIRE, {
    refetchQueries: [{ query: LIST_QUESTIONNARIES }],
  });

  console.log("currentSurvey", currentSurvey);
  const [updateSurvey] = useMutation(UPDATE_SURVEY, {
    refetchQueries: [
      {
        query: LIST_QUESTIONNARIES,
        variables: {
          filter: { archived: { ne: true }, deleted: { ne: true } },
        },
      },
    ],
  });
  const handleSurveyChange = (e) => {
    setSurveyId(e.target.value);
  };

  const enableButton =
    Boolean(values.name) &&
    Boolean(values.description) &&
    Boolean(values.introMsg) &&
    Boolean(values.endMsg);
  const onClickUpdate = async () => {
    await UpdateQuestionnaire({ variables: { input: values } });
    // const { data } = res;
    // if (data.updateQuestionnaire) {
    //   const surveyData = {
    //     id: surveyId,
    //     surveyPreQuestionnaireId: data?.updateQuestionnaire?.id,
    //   };
    //   await updateSurvey({ variables: { input: surveyData } });
    // }

    toggle();
  };

  return (
    <Box>
      <Grid justifyContent="center" my={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            variant="standard"
            color="secondary"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        {/* <Grid item xs={12} cm={6}>
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
              {data?.listSurveys?.items.map((survey, s) => (
                <MenuItem key={s} value={survey?.id}>
                  {survey.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
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
            onClick={onClickUpdate}
            variant="contained"
            color="primary"
            disabled={!enableButton}
          >
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            Updating ....
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default withSuspense(EditQuestionnaire);
