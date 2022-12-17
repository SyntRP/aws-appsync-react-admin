import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { UPDATE_SURVEY_LOCATION } from "../../graphql/custom/mutations";
import { LIST_SURVEY_LOCATIONS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const UpdateLocation = ({ toggle, initialFormValues }) => {
  const [updateSurveyLocation, { loading, error }] = useMutation(
    UPDATE_SURVEY_LOCATION,
    {
      refetchQueries: [{ query: LIST_SURVEY_LOCATIONS }],
    }
  );
  const { values, handleInputChange } = useForm(initialFormValues);
  const enableButton =
    Boolean(values.location) && Boolean(values.inchargeEmail);
  const onClickUpdate = async () => {
    await updateSurveyLocation({ variables: { input: values } });
    toggle();
  };
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" my={1}>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            id="standard-location"
            label="Location"
            variant="standard"
            color="secondary"
            name="location"
            fullWidth
            onChange={handleInputChange}
            value={values.location}
          />
        </Grid>
        <Grid item xs={12} cm={6}>
          <TextField
            required
            id="standard-location-email"
            label="Email"
            variant="standard"
            color="secondary"
            name="inchargeEmail"
            fullWidth
            onChange={handleInputChange}
            value={values.inchargeEmail}
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

export default withSuspense(UpdateLocation);
