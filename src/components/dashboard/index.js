import { Grid } from "@mui/material";
import { utils, writeFileXLSX } from "xlsx";
import { SurveyEntriesToExcel } from "../../utils/Excel";
import SurveyByDate from "../analytics/chart_report/SurveyByDate";
import SurveyByLocations from "../analytics/chart_report/SurveyByLocations";
import Overview from "./Overview";
import WelcomeAdmin from "./WelcomeAdmin";

const Dashboard = ({
  surveyEntries,
  overviewReady,
  surveyCount,
  surveyLocationsCount,
  surveyUsersCount,
}) => {
  const handleDownloadingReport = () => {
    const modifiedSurveyEntries = SurveyEntriesToExcel(surveyEntries);
    const ws = utils.json_to_sheet(modifiedSurveyEntries);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "SurveyEntries");
    writeFileXLSX(wb, "SurveyReports.xlsx");
  };
  return (
    <Grid container gap={3} columns={13} justifyItems="center" py={1}>
      <Grid item xs={13} lg={6}>
        <WelcomeAdmin onDownload={handleDownloadingReport} />
      </Grid>
      <Grid item xs={13} lg={6}>
        {!overviewReady && (
          <Overview
            surveyCount={surveyCount}
            surveyLocationsCount={surveyLocationsCount}
            surveyEntriesCount={surveyEntries?.length || 0}
            surveyUsersCount={surveyUsersCount}
          />
        )}
      </Grid>
      <Grid item xs={13} lg={6}>
        <SurveyByLocations
          data={surveyEntries}
          setSelectedLocation={() => null}
        />
      </Grid>
      <Grid item xs={13} lg={6}>
        <SurveyByDate data={surveyEntries} setSelectedLocation={() => null} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
