import { useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { UPDATE_SURVEY_LOCATION } from "../../graphql/custom/mutations";
import { LIST_SURVEY_LOCATIONS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const UpdateLocation = ({ toggle, initialFormValues }) => {
  const [updateSurveyLocation, { loading }] = useMutation(
    UPDATE_SURVEY_LOCATION,
    {
      refetchQueries: [{ query: LIST_SURVEY_LOCATIONS }],
    }
  );
  const { values, handleInputChange } = useForm(initialFormValues);
  const { data } = useQuery(LIST_SURVEY_LOCATIONS);
  const [duplicate, setDuplicate] = useState(false);
  const [locationDup, setLocationDup] = useState("");
  const [error, setError] = useState(null);
  const surveyLocations = data?.listSurveyLocations?.items?.filter(
    (item) => item?.id !== values?.id
  );

  const isValidEmail = (e) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(e);

  const handleInchargeEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    handleInputChange(e);
  };
  const handleLocation = (e) => {
    handleInputChange(e);
    setDuplicate(false);
  };

  const SurveyLocation = async () => {
    let findEntries = surveyLocations?.find(
      (s) => s?.location .toLowerCase() === values.location.toLowerCase()
    );
    if (findEntries) {
      return true;
    } else {
      return false;
    }
  };

  const enableButton =
    Boolean(values.location) && Boolean(values.inchargeEmail);

  const onClickUpdate = async () => {
    let dup = await SurveyLocation();
    if (dup) {
      setDuplicate(true);
      setLocationDup(
        `${values.location} already Exists. Give another Location `
      );
    } else {
      await updateSurveyLocation({ variables: { input: values } });
      toggle();
    }
  };
  return (
    <Box>
      {duplicate ? <Alert severity="error">{locationDup}</Alert> : null}
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
            onChange={handleLocation}
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
            onChange={handleInchargeEmail}
            value={values.inchargeEmail}
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

export default withSuspense(UpdateLocation);
