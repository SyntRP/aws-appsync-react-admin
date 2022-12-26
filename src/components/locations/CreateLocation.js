import { useQuery, useMutation } from "@apollo/client";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_SURVEY_LOCATION } from "../../graphql/custom/mutations";
import { LIST_SURVEY_LOCATIONS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const initialFormValues = {
  location: "",
  inchargeEmail: "",
  deleted: false,
};

const CreateLocation = ({ toggle }) => {
  const [createSurveyLocation, { loading }] = useMutation(
    CREATE_SURVEY_LOCATION,
    {
      refetchQueries: [{ query: LIST_SURVEY_LOCATIONS }],
    }
  );
  const { data } = useQuery(LIST_SURVEY_LOCATIONS);
  const { values, handleInputChange } = useForm(initialFormValues);
  const [duplicate, setDuplicate] = useState(false);
  const [locationDup, setLocationDup] = useState("");
  const [error, setError] = useState(null);

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

  const SurveyLocation = async (iloc) => {
    let findEntries = data?.listSurveyLocations?.items.find(
      (s) => s?.location === iloc
    );
    if (findEntries) {
      return true;
    }
  };

  const enableButton =
    Boolean(values.location) && Boolean(values.inchargeEmail);
  const onClickCreate = async () => {
    let dup = await SurveyLocation(values.location);
    if (dup) {
      setDuplicate(true);
      setLocationDup(
        `${values.location} already Exists. Give another Location `
      );
    } else {
      await createSurveyLocation({ variables: { input: values } });
      toggle();
    }
  };
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" my={1}>
        {duplicate ? <Alert severity="error">{locationDup}</Alert> : null}
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

export default withSuspense(CreateLocation);
