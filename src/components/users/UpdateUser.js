import { useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { UPDATE_SURVEY_USER } from "../../graphql/custom/mutations";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const UpdateUser = ({ toggle, initialFormValues }) => {
  const [updateSurveyUser, { loading }] = useMutation(UPDATE_SURVEY_USER, {
    refetchQueries: [{ query: LIST_SURVEY_USERS }],
  });
  const { values, handleInputChange } = useForm(initialFormValues);
  const enableButton = Boolean(values.name) && Boolean(values.email);
  const { data } = useQuery(LIST_SURVEY_USERS);
  const [error, setError] = useState(null);
  const [duplicate, setDuplicate] = useState(false);
  const [userEmailDup, setUserEmailDup] = useState("");
  const surveyUsers = data?.listSurveyUsers?.items?.filter(
    (item) => item?.id !== values?.id
  );
  const isValidEmail = (e) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(e);

  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    handleInputChange(e);
    setDuplicate(false);
  };
  const UserEmail = async () => {
    const findEmail = surveyUsers?.find((s) => s?.email === values.email);
    if (findEmail) {
      return true;
    } else return false;
  };
  const onClickUpdate = async () => {
    let dup = await UserEmail();
    if (dup) {
      setDuplicate(true);
      setUserEmailDup(`${values.email} already Exists. Give another Email `);
    } else {
      await updateSurveyUser({ variables: { input: values } });
      toggle();
    }
  };
  return (
    <Box>
      {duplicate ? <Alert severity="error">{userEmailDup}</Alert> : null}
      <Grid container spacing={2} justifyContent="center" my={1}>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            id="standard-user-name"
            label="User Name"
            variant="standard"
            color="secondary"
            name="name"
            fullWidth
            onChange={handleInputChange}
            value={values.name}
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            id="standard-email"
            label="Email"
            variant="standard"
            color="secondary"
            name="email"
            fullWidth
            onChange={handleEmail}
            value={values.email}
          />
          {error ? <Alert severity="error">{error}</Alert> : null}
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

export default withSuspense(UpdateUser);
