import withSuspense from "../../helpers/hoc/withSuspense";
import { useQuery } from "@apollo/client";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const ViewSurvey = ({ currentSurveyData }) => {
  const { image, name, description, preQuestionnaire, createdAt } =
    currentSurveyData;

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="100"
        src={image}
        alt="Survey Logo"
        sx={{ p: 0.5, objectFit: "contain" }}
      />
      <CardHeader />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {description && (
          <Typography gutterBottom variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}

        <Typography gutterBottom variant="body2">
          created time : {moment(createdAt).format(" Do MMMM  YYYY")}
        </Typography>

        {preQuestionnaire?.name && (
          <Typography gutterBottom variant="button" component="div">
            Associated Questionnaire : {preQuestionnaire?.name}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {preQuestionnaire?.name && (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            component={Link}
            to={`/questionnaries/${preQuestionnaire?.id}`}
          >
            View Questionnaire
          </Button>
        )}
      </CardActions>
    </Box>
  );
};

export default withSuspense(ViewSurvey);
