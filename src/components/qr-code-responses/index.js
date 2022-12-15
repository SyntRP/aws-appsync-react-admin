import {
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { useQuery } from "@apollo/client";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  LIST_QUESTIONNARIES_NAME,
  LIST_SURVEY_ENTRIES,
} from "../../graphql/custom/queries";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

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

const QrCodeResponses = () => {
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

  const [qrCodeResponses, setQrCodeResponses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSetSurvey = (SurveyEntriesData) => {
    const {
      listSurveyEntriess: { items },
    } = SurveyEntriesData;
    if (items?.length > 0) setQrCodeResponses(items);
  };
  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);
  const listQrResponsesData = qrCodeResponses
    ?.filter((user) => user?.location?.location)
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const QrResponsesData = listQrResponsesData?.filter(
    (user) => user?.testing === null || user?.testing === false
  );
  const onGettingQuestionnaireById = (id) => {
    const que = questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.id === id
    );

    return que?.name ?? id;
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (!listSurveyEntriesLoading && !listSurveyEntriesError)
      handleSetSurvey(listSurveyEntriesData);
  }, [listSurveyEntriesLoading]);

  return (
    <>
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
                    <Button
                      size="small"
                      color="secondary"
                      component={Link}
                      to={`/surveyresponses?Rid=${res?.id}`}
                    >
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
    </>
  );
};

export default QrCodeResponses;
