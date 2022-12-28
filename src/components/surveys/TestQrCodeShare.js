import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import withSuspense from "../../helpers/hoc/withSuspense";
import {
  LIST_SURVEY_LOCATIONS,
  LIST_QUESTIONNARIES_NAME,
} from "../../graphql/custom/queries";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import validator from "validator";
import axios from "axios";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

const TestQrCodeShare = ({ toggle, surveyId }) => {
  const { loading, error, data } = useQuery(LIST_SURVEY_LOCATIONS);
  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);
  const [surveyLocation, setSuveyLocation] = useState("");
  const [inchargeEmail, setInchargeEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [alertSuccessEmail, setAlertSuccessEmail] = useState(false);
  const [alertContentSuccess, setAlertContentSuccess] = useState("");
  const [alertContentFail, setAlertContentFail] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const emailUrl =
    "https://stonemor.netlify.app/.netlify/functions/server/send";
  const baseUrl = "https://main.d3d8mcg1fsym22.amplifyapp.com";
  const surveyQrcodeTest = `${baseUrl}/surveyquestionstest/${surveyId}?uid=${surveyLocation}`;

  /* Get quetion by questionID */
  const onGettingQuestionById = (id) => {
    const que = questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.id === surveyId
    );

    return que?.name ?? id;
  };

  const surveyLoc = data?.listSurveyLocations?.items?.find(
    (loc) => loc?.id === surveyLocation
  );
  const surveyName = onGettingQuestionById(surveyId);

  //mailSent//
  const canvas = document?.getElementById("qr-gen");
  const pngUrl = canvas
    ?.toDataURL("image/png")
    ?.replace("image/png", "image/octet-stream");

  const QrData = {
    mail: inchargeEmail,
    qrCode: pngUrl,
    survey: surveyName,
    loc: surveyLoc?.location,
  };
  const handleSendEmail = async () => {
    axios
      .post(`${emailUrl}`, QrData)
      .then((res) => {
        if (res.data.mailSent === true) {
          setAlertContentSuccess(
            `QR code send to  ${inchargeEmail}  successfully`
          );
          setAlertSuccess(true);
        } else {
          setAlertContentFail("Invalid Email ID");
          setAlertFail(true);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const downloadQRCodeTest = () => {
    // Generate download with use canvas and stream
    const canvas = document?.getElementById("qr-gen");
    const pngUrl = canvas
      ?.toDataURL("image/png")
      ?.replace("image/png", "image/octet-stream");
    let downloadLink = document?.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${surveyName}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  //emai validation//
  const handleEmail = (e) => {
    setInchargeEmail(e.target.value);
    if (validator.isEmail(inchargeEmail)) {
      setEmailSuccess("valid email");
      setAlertSuccessEmail(true);
      setAlertError(false);
    } else {
      setEmailError("Enter valid Email!");
      setAlertError(true);
      setAlertSuccessEmail(false);
    }
  };
  useEffect(() => {
    const surveyLoc = data?.listSurveyLocations?.items?.find(
      (loc) => loc?.id === surveyLocation
    );
    setInchargeEmail(surveyLoc?.inchargeEmail || " ");
  }, [surveyLocation]);
  return (
    <Box my={2}>
      <Box my={2}>
        {alertSuccess ? (
          <Alert severity="success">{alertContentSuccess}</Alert>
        ) : (
          ""
        )}
        {alertFail ? <Alert severity="error">{alertContentFail}</Alert> : ""}
      </Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Location</InputLabel>
        <Select
          margin="dense"
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Location"
          value={surveyLocation}
          onChange={(event) => setSuveyLocation(event.target.value)}
        >
          {data?.listSurveyLocations?.items?.map((user, u) => (
            <MenuItem key={u} value={user?.id}>
              {user?.location} - {user?.inchargeEmail}
            </MenuItem>
          ))}
        </Select>

        {/* <TextField
          margin="dense"
          id="InchargeEmail"
          label="Email"
          value={inchargeEmail}
          onChange={(e) => handleEmail(e)}
          fullWidth
          type="email"
        /> */}
      </FormControl>
      {alertSuccessEmail ? (
        <Alert severity="success">{emailSuccess}</Alert>
      ) : (
        ""
      )}
      {alertError ? <Alert severity="error">{emailError}</Alert> : ""}{" "}
      <Box my={1}>
        {surveyLocation && (
          <Grid item container spacing={2} minHeight={160}>
            <Grid
              item
              xs
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <QRCode
                id="qr-gen"
                value={surveyQrcodeTest}
                size={280}
                level={"H"}
                includeMargin={true}
              />
            </Grid>

            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Grid>
            <Grid
              item
              xs
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <IconButton
                color="primary"
                aria-label="mailsend"
                onClick={downloadQRCodeTest}
              >
                <DownloadForOfflineOutlinedIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="error"
                aria-label="mailsend"
                onClick={handleSendEmail}
              >
                <ForwardToInboxOutlinedIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default withSuspense(TestQrCodeShare);
