import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { UPDATE_SURVEY } from "../../graphql/custom/mutations";
import { LIST_SURVEYS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const UpdateSurvey = ({ toggle, initialFormValues, surveys }) => {
  const [updateSurvey, { loading, error }] = useMutation(UPDATE_SURVEY, {
    refetchQueries: [{ query: surveys }],
  });
  const { values, handleInputChange } = useForm(initialFormValues);
  const enableButton =
    Boolean(values.name) &&
    Boolean(values.description) &&
    Boolean(values.image);
  const onClickUpdate = async () => {
    await updateSurvey({ variables: { input: values } });
    toggle();
  };
  return (
    <Box>
      <Grid my={2} justifyContent="center">
        <Grid item xs={12} my={2}>
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
        <Grid item xs={12} my={2}>
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
        <Grid item xs={12} my={2}>
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

export default withSuspense(UpdateSurvey);
