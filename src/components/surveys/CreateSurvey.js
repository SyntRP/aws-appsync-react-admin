import { useMutation } from "@apollo/client";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_SURVEY } from "../../graphql/custom/mutations";
import { LIST_SURVEYS } from "../../graphql/custom/queries";

import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const initialFormValues = {
  name: "",
  description: "",
  image:
    "https://dynamix-cdn.s3.amazonaws.com/stonemorcom/stonemorcom_616045937.svg",

  groups: "Users",
  archived: false,
  deleted: false,
};

const CreateSurvey = ({ toggle, surevy }) => {
  const [createSurvey, { loading }] = useMutation(CREATE_SURVEY, {
    refetchQueries: [
      {
        query: LIST_SURVEYS,
        variables: {
          filter: { archived: { ne: true }, deleted: { ne: true } },
          limit: 100,
        },
      },
    ],
  });
  const { values, handleInputChange } = useForm(initialFormValues);
  const [duplicate, setDuplicate] = useState(false);
  const [surveyDup, setSurveyDup] = useState("");

  const handleChangeName = (e) => {
    handleInputChange(e);
    setDuplicate(false);
  };

  const SurveyEntries = async (sname) => {
    let findEntries = surevy?.find(
      (s) => s?.name.toLowerCase() === sname.toLowerCase()
    );
    if (findEntries) {
      return true;
    } else {
      return false;
    }
  };

  const enableButton =
    Boolean(values.name) &&
    Boolean(values.description) &&
    Boolean(values.image);
  const onClickCreate = async () => {
    let dup = await SurveyEntries(values.name);
    if (dup) {
      setDuplicate(true);
      setSurveyDup(`${values.name} already Exists. Give another SurveyName `);
    } else {
      await createSurvey({ variables: { input: values } });
      toggle();
    }
  };
  return (
    <Box>
      {duplicate ? <Alert severity="error">{surveyDup}</Alert> : null}
      <Grid my={2} justifyContent="center">
        <Grid item xs={12} cm={6} my={2}>
          <TextField
            required
            id="standard-survey-name"
            label="Survey Name"
            variant="standard"
            color="secondary"
            name="name"
            fullWidth
            onChange={handleChangeName}
            value={values.name}
          />
        </Grid>
        <Grid item xs={12} cm={6} my={2}>
          <TextField
            required
            id="standard-description"
            label="Description"
            variant="standard"
            color="secondary"
            name="description"
            fullWidth
            onChange={handleInputChange}
            value={values.description}
          />
        </Grid>
        <Grid item xs={12} cm={6} my={2}>
          <TextField
            required
            id="standard-image"
            label="Image"
            variant="standard"
            color="secondary"
            name="image"
            fullWidth
            onChange={handleInputChange}
            value={values.image}
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
        spacing={2}
        my={2}
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

export default withSuspense(CreateSurvey);
