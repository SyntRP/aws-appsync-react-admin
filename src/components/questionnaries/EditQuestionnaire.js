import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UPDATE_QUESTIONNAIRE } from "../../graphql/custom/mutations";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const EditQuestionnaire = ({ questionnarie, toggle }) => {
  const initialFormValues = {
    id: questionnarie?.id,
    name: undefined,
    description: undefined,
    type: "PRE",
    introMsg: "Welcome to StoneMor Suvey. Click continue to attend survey.",
    endMsg:
      "Thank you for completing our survey. If you have requested a follow up,someone will be in touch with you soon.",
  };

  const { values, handleInputChange } = useForm(initialFormValues);

  const [UpdateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE, {
    refetchQueries: [{ query: questionnarie }],
  });
  const enableButton =
    Boolean(values.name) &&
    Boolean(values.description) &&
    Boolean(values.introMsg) &&
    Boolean(values.endMsg);

  const onClickUpdate = async () => {
    await UpdateQuestionnaire({ variables: { input: values } });
    toggle();
  };

  return (
    <Box>
      <Grid justifyContent="center" my={1}>
        <Grid item xs={12} >
          <TextField
           fullWidth
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            variant="standard"
            color="secondary"
            value={initialFormValues.name}
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
            value={initialFormValues.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            margin="dense"
            id="introMsg"
            name="introMsg"
            label="Intro Message"
            variant="standard"
            color="secondary"
            value={initialFormValues.introMsg}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            margin="dense"
            id="endMsg"
            name="endMsg"
            label="Thank You Message"
            variant="standard"
            color="secondary"
            value={initialFormValues.endMsg}
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
          <Button
            onClick={onClickUpdate}
            variant="contained"
            color="primary"
            disabled={!enableButton}
          >
            Update
          </Button>
      </Box>
    </Box>
  );
};

export default withSuspense(EditQuestionnaire);
