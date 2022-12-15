import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CREATE_SURVEY_USER } from "../../graphql/custom/mutations";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import useForm from "../../helpers/hooks/useForm";

const initialFormValues = {
  name: undefined,
  email: undefined,
};

const CreateUser = ({ toggle }) => {
  const [createSurveyUser, { loading, error }] = useMutation(
    CREATE_SURVEY_USER,
    {
      //   update: (cache, { data: { createSurveyUser } }) => {
      //     const { listSurveyUsers } = cache.readQuery({
      //       query: LIST_SURVEY_USERS,
      //     });
      //     const data = {
      //       listSurveyUsers: {
      //         ...listSurveyUsers,
      //         items: [createSurveyUser, ...listSurveyUsers.items],
      //       },
      //     };
      //     cache.writeQuery({
      //       query: LIST_SURVEY_USERS,
      //       data,
      //     });
      //   },
      refetchQueries: [{ query: LIST_SURVEY_USERS }],
    }
  );
  const { values, handleInputChange } = useForm(initialFormValues);
  const enableButton = Boolean(values.name) && Boolean(values.email);
  const onClickCreate = async () => {
    await createSurveyUser({ variables: { input: values } });
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
            value={initialFormValues.name}
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
            value={initialFormValues.email}
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
