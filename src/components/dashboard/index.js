import { Grid, Paper } from "@mui/material";
import SurveyByLocations from "../analytics/chart_report/SurveyByLocations";
import DynamicModel from "../reusable/DynamicModel";
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
        <DynamicModel />
      </Grid>
      <Grid item xs={12} lg={6}>
        <SurveyByLocations
          data={surveyEntries}
          setSelectedLocation={() => null}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
