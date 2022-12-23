import {
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import {
  LIST_QUESTIONNARIES_NAME,
  LIST_SURVEY_ENTRIES,
} from "../../graphql/custom/queries";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import withSuspense from "../../helpers/hoc/withSuspense";
import LinkSurveyEntries from "./LinkSurveyEntries";
import QrSurveyEntries from "./QrSurveyEntries";
import { Loader } from "../common/Loader";
import IncompletedSurveyEntries from "./IncompletedSurveyEntries";
import SearchBar from "../reusable/SearchBar";

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
const SurveyEntries = () => {
  const [tabValue, setTabValue] = useState(0);
  const [surveyEntriesData, setSurveyEntriesData] = useState([]);
  const [surveySearched, setSurveySearched] = useState("");
  
  let variables = { filter: { archived: { ne: true } }, limit: 100 };
  const {
    loading: listSurveyEntriesLoading,
    error: listSurveyEntriesError,
    data: listSurveyEntriesData,
  } = useQuery(LIST_SURVEY_ENTRIES, {
    variables,
  });
  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);
  const handleSetResponses = (SurveyEntriesData) => {
    const {
      listSurveyEntriess: { items },
    } = SurveyEntriesData;
    if (items?.length > 0) setSurveyEntriesData(items);
  };

  const surveyEntriesList = surveyEntriesData.filter(
    (user) => user?.responses?.items?.length !== 0
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!listSurveyEntriesLoading && !listSurveyEntriesError)
      handleSetResponses(listSurveyEntriesData);
  }, [listSurveyEntriesLoading]);

  if (listSurveyEntriesLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div sx={{ mt: 2 }}>
        <SearchBar searchInput={(e) => setSurveySearched(e.target.value)} />
      </div>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          mt: 2,
          // display: "flex",
          // justifyContent: "flex-start",
          // alignItems: "center",
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
          <Tab label=" Link SurveyEntries " />
          <Tab label=" Qr Code SurveyEntries" />
          <Tab label=" Incompleted Link SurveyEntries" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <LinkSurveyEntries
          surveyEntries={surveyEntriesList
            ?.filter((user) => user?.by?.name)
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )}
          questionnaries={questionariesName}
          linkSurvey={surveySearched}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <QrSurveyEntries
          surveyEntries={surveyEntriesList
            ?.filter((user) => user?.location?.location)
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )}
          questionnaries={questionariesName}
          qrSurvey={surveySearched}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <IncompletedSurveyEntries
          questionnaries={questionariesName}
          incompleteSurvey={surveySearched}
        />
      </TabPanel>
    </div>
  );
};

export default withSuspense(SurveyEntries);
