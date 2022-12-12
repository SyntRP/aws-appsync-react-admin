import { lazy, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { LIST_QUESTIONNARIES_NAME } from "../../graphql/custom/queries";
import QuestionnariesByLocation from "./chart_report/QuestionnariesByLocation";
import ResponsiveDateRangePicker from "../reusable/DateRangePicker";
import moment from "moment";
const SurveyByQuestionnarie = lazy(() =>
  import("./chart_report/SurveyByQuestionnarie")
);

const SurveyByLocations = lazy(() =>
  import("./chart_report/SurveyByLocations")
);

const TabPanel = (props) => {
  const { value, index, items, children, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
          <Grid container spacing={2} alignItems="stretch">
            {items?.length > 0 &&
              items?.map((Item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  {Item}
                </Grid>
              ))}
          </Grid>
        </>
      )}
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
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
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
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={6}>
            <ResponsiveDateRangePicker
              fromDate={fromDate}
              setFromDate={setFromDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Grid>
        </Grid>
      </Box>
      <TabPanel
        value={tabValue}
        index={0}
        items={[
          <SurveyByLocations
            data={surveyEntries}
            setSelectedLocation={setSelectedLocation}
          />,

          <QuestionnariesByLocation
            data={surveyEntries}
            questionariesName={questionariesName}
            loading={loading}
            error={error}
            selectedLocation={selectedLocation}
          />,
          // <SurveyByQuestionnarie
          //   data={surveyEntries}
          //   questionariesName={questionariesName}
          //   loading={loading}
          //   error={error}
          // />,
        ]}
      ></TabPanel>

      <TabPanel value={tabValue} index={1}>
        2
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        3
      </TabPanel>
    </div>
  );
};

export default Analytics;
