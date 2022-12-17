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
import moment from "moment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    boxShadow: "3px 2px 5px 2px #888888",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
const TestResponses = () => {
  const [tabValue, setTabValue] = useState(0);
  let variables = {
    limit: 1000,
  };
  const {
    loading: listSurveyEntriesLoading,
    error: listSurveyEntriesError,
    data: listSurveyEntriesData,
  } = useQuery(LIST_SURVEY_ENTRIES, {
    variables,
  });
  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);

  const onGettingQuestionnaireById = (id) => {
    const que = questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.id === id
    );

    return que?.name ?? id;
  };
  const [linkResponses, setLinkResponses] = useState([]);
  const [qrCodeResponses, setQrCodeResponses] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSetResponses = (SurveyEntriesData) => {
    const {
      listSurveyEntriess: { items },
    } = SurveyEntriesData;
    if (items?.length > 0) setLinkResponses(items);
  };
  const handleSetSurvey = (SurveyEntriesData) => {
    const {
      listSurveyEntriess: { items },
    } = SurveyEntriesData;
    if (items?.length > 0) setQrCodeResponses(items);
  };
  const listLinkResponsesData = linkResponses
    ?.filter((user) => user?.by?.name)
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const listQrResponsesData = qrCodeResponses
    ?.filter((user) => user?.location?.location)
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const LinkResponsesData = listLinkResponsesData?.filter(
    (user) => user?.testing === true && user?.responses?.items?.length > 0
  );

  const QrResponsesData = listQrResponsesData?.filter(
    (user) => user?.testing === true && user?.responses?.items?.length > 0
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (!listSurveyEntriesLoading && !listSurveyEntriesError)
      handleSetResponses(listSurveyEntriesData);
  }, [listSurveyEntriesLoading]);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!listSurveyEntriesLoading && !listSurveyEntriesError)
      handleSetSurvey(listSurveyEntriesData);
  }, [listSurveyEntriesLoading]);
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
          <Tab label="Test Link Responses" />
          <Tab label="Test Qr Responses" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {LinkResponsesData?.length > 0 && (
          <Paper elevation={10}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>S.NO</StyledTableCell>

                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Questionnaire</StyledTableCell>
                  <StyledTableCell>Start Time</StyledTableCell>
                  <StyledTableCell>Finish Time</StyledTableCell>
                  <StyledTableCell>Manage</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {LinkResponsesData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((res, u) => (
                  <StyledTableRow key={u}>
                    <StyledTableCell>{u + 1}</StyledTableCell>
                    <StyledTableCell>{res?.by?.name}</StyledTableCell>
                    <StyledTableCell>{res?.by?.email}</StyledTableCell>
                    <StyledTableCell>
                      {onGettingQuestionnaireById(res?.questionnaireId)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {moment(res?.startTime).format("DD-MM-YYYY hh:mm A")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {moment(res?.finishTime).format("DD-MM-YYYY hh:mm A")}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button size="small" color="secondary">
                        <VisibilityOutlinedIcon color="inherit" />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={LinkResponsesData?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {QrResponsesData?.length > 0 && (
          <Paper elevation={10}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>S.NO</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Questionnaire</StyledTableCell>
                  <StyledTableCell>Start Time</StyledTableCell>
                  <StyledTableCell>Finish Time</StyledTableCell>
                  <StyledTableCell>Manage</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {QrResponsesData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((res, u) => (
                  <StyledTableRow key={u}>
                    <StyledTableCell>{u + 1}</StyledTableCell>
                    <StyledTableCell>{res?.location?.location}</StyledTableCell>
                    <StyledTableCell>
                      {res?.location?.inchargeEmail}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {onGettingQuestionnaireById(res?.questionnaireId)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {moment(res?.startTime).format("DD-MM-YYYY hh:mm A")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {moment(res?.finishTime).format("DD-MM-YYYY hh:mm A")}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button size="small" color="secondary">
                        <VisibilityOutlinedIcon color="inherit" />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={QrResponsesData?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </TabPanel>
    </div>
  );
};

export default TestResponses;
