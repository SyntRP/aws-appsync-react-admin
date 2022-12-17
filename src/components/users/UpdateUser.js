import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { UPDATE_SURVEY_USER } from "../../graphql/custom/mutations";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const UpdateUser = ({ toggle, initialFormValues }) => {
  const [updateSurveyUser, { loading, error }] = useMutation(
    UPDATE_SURVEY_USER,
    {
      refetchQueries: [{ query: LIST_SURVEY_USERS }],
    }
  );
  const { values, handleInputChange } = useForm(initialFormValues);
  const enableButton = Boolean(values.name) && Boolean(values.email);
  const onClickUpdate = async () => {
    await updateSurveyUser({ variables: { input: values } });
    toggle();
  };
  return (
    <Box>
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
            onChange={handleInputChange}
            value={values.email}
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

export default withSuspense(UpdateUser);
