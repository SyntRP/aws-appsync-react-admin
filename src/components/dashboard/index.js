import { Grid, Paper } from "@mui/material";
import SurveyByLocations from "../analytics/chart_report/SurveyByLocations";
import Overview from "./Overview";
import WelcomeAdmin from "./WelcomeAdmin";

const Dashboard = ({
  surveyEntries,
  overviewReady,
  surveyCount,
  surveyLocationsCount,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <WelcomeAdmin />
        {!overviewReady && (
          <Overview
            surveyCount={surveyCount}
            surveyLocationsCount={surveyLocationsCount}
            surveyEntriesCount={surveyEntries?.length || 0}
          />
        )}
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper variant="elevation" elevation={8} sx={{ p: 0.35 }}>
          <SurveyByLocations
            data={surveyEntries}
            setSelectedLocation={() => null}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
