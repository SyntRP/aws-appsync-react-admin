import { Grid, Paper } from "@mui/material";
import SurveyByLocations from "../analytics/chart_report/SurveyByLocations";
import BreadCrumbs from "../reusable/BreadCrumbs";
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
    <Grid container gap={3} columns={13} justifyItems="center" py={1}>
      <Grid item xs={13} lg={6}>
        <WelcomeAdmin />
      </Grid>
      <Grid item xs={13} lg={6}>
        {!overviewReady && (
          <Overview
            surveyCount={surveyCount}
            surveyLocationsCount={surveyLocationsCount}
            surveyEntriesCount={surveyEntries?.length || 0}
          />
        )}
      </Grid>
      <Grid item xs={13} lg={6}>
        <SurveyByLocations
          data={surveyEntries}
          setSelectedLocation={() => null}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
