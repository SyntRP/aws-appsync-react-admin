import { useQuery, useMutation } from "@apollo/client";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_SURVEY_USER } from "../../graphql/custom/mutations";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const initialFormValues = {
  name: "",
  email: "",
  deleted: false,
};

const CreateUser = ({ toggle }) => {
  const [createSurveyUser, { loading }] = useMutation(
    CREATE_SURVEY_USER,
    {
      refetchQueries: [{ query: LIST_SURVEY_USERS }],
    }
  );
  const { data } = useQuery(LIST_SURVEY_USERS);
  const [error, setError] = useState(null);
  const { values, handleInputChange } = useForm(initialFormValues);
  const [duplicate, setDuplicate] = useState(false);
  const [userEmailDup, setUserEmailDup] = useState("");

  const isValidEmail = (e) =>  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(e);
  
  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    handleInputChange(e);
    setDuplicate(false);
  };

  const UserEmail = async (uemail) => {
    let findEntries = data?.listSurveyUsers?.items?.find(
      (s) => s?.email === uemail
    );
    if (findEntries) {
      return true;
    }
  };

  const enableButton = Boolean(values.name) && Boolean(values.email);
  const onClickCreate = async () => {
    let dup = await UserEmail(values.email);
    if (dup) {
      setDuplicate(true);
      setUserEmailDup(`${values.email} already Exists. Give another Email `);
    } else {
      await createSurveyUser({ variables: { input: values } });
      toggle();
    }
  };
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" my={1}>
        {duplicate ? <Alert severity="error">{userEmailDup}</Alert> : null}
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

export default withSuspense(CreateUser);
