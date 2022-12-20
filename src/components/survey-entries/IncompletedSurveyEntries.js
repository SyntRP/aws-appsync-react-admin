import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import withSuspense from "../../helpers/hoc/withSuspense";
import { useQuery } from "@apollo/client";
import {
  LIST_INCOMPLETED_SURVEY_ENTRIES,
  LIST_QUESTIONNARIES_NAME,
} from "../../graphql/custom/queries";
import { Loader } from "../common/Loader";

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
const IncompletedSurveyEntries = ({ questionnaries }) => {
  const [incompeletedSurveyEntriesData, setIncompletedSurveyEntriesData] =
    useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let variables = {
    limit: 10000,
  };
  const {
    loading: listIncompletedSurveyEntriesLoading,
    error: listIncompletedSurveyEntriesError,
    data: listIncompletedSurveyEntriesData,
  } = useQuery(LIST_INCOMPLETED_SURVEY_ENTRIES, {
    variables,
  });
  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);

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
    if (
      !listIncompletedSurveyEntriesLoading &&
      !listIncompletedSurveyEntriesError
    )
      setIncompletedSurveyEntriesData(
        listIncompletedSurveyEntriesData?.listSurveyEntriess?.items
      );
  }, [
    listIncompletedSurveyEntriesLoading,
    listIncompletedSurveyEntriesData?.listSurveyEntriess?.items,
  ]);

  if (listIncompletedSurveyEntriesLoading) {
    return <Loader />;
  }
  if (listIncompletedSurveyEntriesError) {
    return <>error</>;
  }
  return (
    <>
      {" "}
      {/* {linkResponses?.length > 0 && ( */}
      <Paper>
        <>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>S.NO</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>

                <StyledTableCell>Questionnaire</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>

                <StyledTableCell>completed status</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {incompeletedSurveyEntriesData
                ?.filter((user) => user?.by?.name)
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, u) => (
                  <StyledTableRow key={u}>
                    <StyledTableCell>{u + 1}</StyledTableCell>
                    <StyledTableCell>{user?.by?.name}</StyledTableCell>
                    <StyledTableCell>{user?.by?.email}</StyledTableCell>

                    <StyledTableCell>
                      {" "}
                      {onGettingQuestionnaireById(user?.questionnaireId)}
                    </StyledTableCell>

                    <StyledTableCell>
                      {moment(user?.startTime).format("DD-MM-YYYY hh:mm A")}
                    </StyledTableCell>

                    <StyledTableCell>{user?.complete}%</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={incompeletedSurveyEntriesData?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </Paper>
      {/* )} */}
    </>
  );
};

export default withSuspense(IncompletedSurveyEntries);
