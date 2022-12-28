import { useMutation, useQuery } from "@apollo/client";
import {
  Alert, Button,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  UPDATE_QUESTIONNAIRE,
  UPDATE_SURVEY,
} from "../../graphql/custom/mutations";
import {
  LIST_QUESTIONNARIES,
} from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const EditQuestionnaire = ({ toggle, initialFormValues }) => {
  const { values, handleInputChange } = useForm(initialFormValues);


  const [UpdateQuestionnaire, { loading }] = useMutation(UPDATE_QUESTIONNAIRE, {
    refetchQueries: [{ query: LIST_QUESTIONNARIES }],
  });

  const { data } = useQuery(LIST_QUESTIONNARIES);
  const [duplicate, setDuplicate] = useState(false);
  const [qustionnaireDup, setQuestionnaireDup] = useState("");
  const surveyQuestionnaire = data?.listQuestionnaires?.items?.filter(
    (item) => item?.id !== values?.id
  );

  const handleQuestionnaireName = (e) => {
    handleInputChange(e);
    setDuplicate(false);
  };
  const SurveyQuestionnaires = async () => {
    let findEntries = surveyQuestionnaire?.find((s) => s?.name.toLowerCase() === values.name.toLowerCase());
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
    Boolean(values.endMsg);
  const onClickUpdate = async () => {
    let dup = await SurveyQuestionnaires();
    if (dup) {
      setDuplicate(true);
      setQuestionnaireDup(
        `${values.name} already Exists. Give another Location `
      );
    } else {
      await UpdateQuestionnaire({ variables: { input: values } });
      toggle();
    }
  };

  return (
    <Box>
      {duplicate ? <Alert severity="error">{qustionnaireDup}</Alert> : null}
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
            onChange={handleQuestionnaireName}
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
