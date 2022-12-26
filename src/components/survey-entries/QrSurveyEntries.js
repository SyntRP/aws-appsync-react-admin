import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { LIST_QUESTIONNARIES_NAME } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
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
const QrSurveyEntries = ({ surveyEntries, questionnaries ,qrSurvey}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const LinkSurveyEntriesData = surveyEntries?.filter((item) =>
  item?.location?.location
    .toString()
    .toLowerCase()
    .includes(qrSurvey.toString().toLowerCase()) ||
  item?.location?.inchargeEmail
    .toString()
    .toLowerCase()
    .includes(qrSurvey.toString().toLowerCase())
)
  const onGettingQuestionnaireById = (id) => {
    const que = questionnaries?.listQuestionnaires?.items?.find(
      (q) => q?.id === id
    );

    return que?.name ?? id;
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {" "}
      {LinkSurveyEntriesData?.length > 0 && (
        <TableContainer component={Paper}>
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
              {LinkSurveyEntriesData?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )?.map((res, u) => (
                <StyledTableRow key={u}>
                  <StyledTableCell>{u + 1}</StyledTableCell>
                  <StyledTableCell>{res?.location?.location}</StyledTableCell>
                  <StyledTableCell>
                    {res?.location?.inchargeEmail}
                  </StyledTableCell>
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
                    <Button
                      size="small"
                      color="secondary"
                      component={Link}
                      to={`/surveyEntries/${res.id}`}
                    >
                      <VisibilityOutlinedIcon color="inherit" />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            component="div"
            count={LinkSurveyEntriesData?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default withSuspense(QrSurveyEntries);
