import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@apollo/client";
import withSuspense from "../../helpers/hoc/withSuspense";
import { useState } from "react";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import copy from "copy-to-clipboard";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

const TestLinkShare = ({ toggle, surveyId }) => {
  const baseUrl = "https://main.d3d8mcg1fsym22.amplifyapp.com";
  const [usersId, setUsersId] = useState("");
  const [userSurveyLink, setUserSurveyLink] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertCopySuccess, setAlertCopySuccess] = useState("");
  const { loading, error, data } = useQuery(LIST_SURVEY_USERS);

  const handleSurveyUserChange = (e) => {
    setUsersId(e.target.value);
  };
  const surveyUrl = `${baseUrl}/surveyquestionstest/${surveyId}?uid=${usersId}`;

  const handleGeneratingSurveyLink = () => {
    const surveyUrl = `${baseUrl}/surveyquestionstest/${surveyId}?uid=${usersId}`;
    setUserSurveyLink(surveyUrl);
  };
  //copy-clipboard//
  const copyToClipboard = () => {
    copy(surveyUrl);
    setAlertSuccess(true);
    setAlertCopySuccess("Survey Link copyed successfully");
  };
  console.log("usersId", usersId);
  return (
    <Box my={2}>
      {" "}
      <Box my={2}>
        {alertSuccess ? (
          <Alert severity="success">{alertCopySuccess}</Alert>
        ) : (
          ""
        )}{" "}
      </Box>
      <FormControl fullWidth>
        <InputLabel>Select User</InputLabel>
        <Select
          margin="dense"
          fullWidth
          label="Select User"
          value={usersId}
          onChange={handleSurveyUserChange}
        >
          {data?.listSurveyUsers?.items.map((user, s) => (
            <MenuItem key={s} value={user?.id}>
              {user.name}
              {"-"}
              {user?.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {userSurveyLink && (
        <>
          <Typography variant="body2" color="text.secondary" my={1}>
            {userSurveyLink}
          </Typography>
          <Button onClick={copyToClipboard}>
            <FileCopyOutlinedIcon />
          </Button>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
        my={1}
        spacing={2}
      >
        <Button onClick={toggle} color="text" variant="contained">
          Close
        </Button>
        <Button
          onClick={handleGeneratingSurveyLink}
          type="button"
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default withSuspense(TestLinkShare);
