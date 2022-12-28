import { lazy, Suspense, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { LIST_QUESTIONNARIES_NAME } from "../../graphql/custom/queries";
import SurveyByLocations from "./chart_report/SurveyByLocations";
import ResponsiveDateRangePicker from "../reusable/DateRangePicker";
import SimpleLineChart from "../charts/line";
import { Loader } from "../common/Loader";
import TestModeSwitch from "../reusable/TestModeSwitch";
import LocationByQuestionnaire from "./chart_report/LocationByQuestionnaire";

const QuestionnariesByLocation = lazy(() =>
  import("./chart_report/QuestionnariesByLocation")
);
const SurveyByQrCode = lazy(() => import("./chart_report/SurveyByQrCode"));
const SurveyByQuestionnarie = lazy(() =>
  import("./chart_report/SurveyByQuestionnarie")
);
const SurveyByLink = lazy(() => import("./chart_report/SurveyByLink"));
const SurveyByDate = lazy(() => import("./chart_report/SurveyByDate"));

// const SurveyByLocations = lazy(() =>
//   import("./chart_report/SurveyByLocations")
// );

const TabPanel = (props) => {
  const { value, index, children, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const Analytics = ({ surveyEntriesData }) => {
  const {
    loading,
    data: questionariesName,
    error,
  } = useQuery(LIST_QUESTIONNARIES_NAME);
  const [surveyEntries, setSurveyEntries] = useState(surveyEntriesData);
  const [tabValue, setTabValue] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedQuestionnarie, setSelectedQuestionnarie] = useState(null);

  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    let filteredEntries = [];
    if (fromDate && endDate) {
      const SD = fromDate.getTime();
      const ED = endDate.getTime();
      filteredEntries = surveyEntriesData?.filter((entry) => {
        const CD = new Date(entry.createdAt).getTime();
        return SD <= CD && CD <= ED;
      });
    } else if (fromDate) {
      const SD = fromDate.getTime();
      filteredEntries = surveyEntriesData?.filter((entry) => {
        const CD = new Date(entry.createdAt).getTime();
        return SD <= CD;
      });
    } else if (endDate) {
      const ED = endDate.getTime();
      filteredEntries = surveyEntriesData?.filter((entry) => {
        const CD = new Date(entry.createdAt).getTime();
        return CD <= ED;
      });
    } else {
      filteredEntries = surveyEntriesData;
    }
    setSurveyEntries(filteredEntries);
  }, [fromDate, endDate]);

  return (
    <div>
      <Grid container spacing={2} sx={{ py: "0.5rem" }}>
        <Grid item xs={6}>
          <Typography variant="h6">Analytics</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs "
          sx={{
            maxWidth: "100%",
            backgroundColor: "secondary.light",
            px: 3,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Tab label="Locations" />
          <Tab label="Survey type" />
          <Tab label="Date" />
        </Tabs>
        <Grid container spacing={3} mb={2} alignItems="flex-start">
          <Grid item xs={4} sm={2} md={1}>
            <Typography variant="button" color="primary">
              Filters
            </Typography>
          </Grid>
          <Grid item xs={10} sm={8} md={6}>
            <ResponsiveDateRangePicker
              fromDate={fromDate}
              setFromDate={setFromDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Grid>
        </Grid>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <SurveyByLocations
              data={surveyEntries}
              setSelectedLocation={setSelectedLocation}
              fromDate={fromDate}
              endDate={endDate}
            />
          </Grid>
          {selectedLocation && (
            <Grid item xs={12} md={6}>
              <Suspense fallback={<Loader />}>
                <QuestionnariesByLocation
                  data={surveyEntries}
                  questionariesName={questionariesName}
                  loading={loading}
                  error={error}
                  selectedLocation={selectedLocation}
                />
              </Suspense>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <SurveyByQuestionnarie
              data={surveyEntries}
              questionariesName={questionariesName}
              loading={loading}
              error={error}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <SurveyByQrCode
              data={surveyEntries}
              questionariesName={questionariesName}
              setSelectedQuestionnarie={setSelectedQuestionnarie}
              fromDate={fromDate}
              endDate={endDate}
            />
          </Grid>
          {selectedQuestionnarie && (
            <Grid item xs={12} md={6}>
              <Suspense fallback={<Loader />}>
                <LocationByQuestionnaire
                  data={surveyEntries}
                  questionariesName={questionariesName}
                  loading={loading}
                  error={error}
                  selectedQuestionnarie={selectedQuestionnarie}
                />
              </Suspense>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <SurveyByLink
              data={surveyEntries}
              questionariesName={questionariesName}
              fromDate={fromDate}
              endDate={endDate}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Grid item xs={12} md={6}>
          <SurveyByDate
            data={surveyEntries}
            loading={loading}
            error={error}
            fromDate={fromDate}
            endDate={endDate}
          />
        </Grid>
      </TabPanel>
    </div>
  );
};

export default Analytics;
