import {
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Button,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { auto } from "@popperjs/core";
import withSuspense from "../../helpers/hoc/withSuspense";
import { GET_QUESTIONNAIRES } from "../../graphql/custom/queries";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    boxShadow: "3px 2px 5px 2px #888888",
  },
}));

const QuestionnariesQuestion = () => {
  const { loading, error, data } = useQuery(GET_QUESTIONNAIRES, {
    variables: { limit: 10 },
  });

  return (
    <div>
      {/* {getQuestionnaire.length > 0 ? ( */}
      <TableContainer
        component={Paper}
        elevation={10}
        sx={{ mr: auto, ml: auto, overflow: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Q.No</StyledTableCell>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>List Options</StyledTableCell>
              <StyledTableCell>Manage</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
              {(rowsPerPage > 0
                ? questionCount.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : questionCount
              ).map((question, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                    {question?.order}
                    </StyledTableCell>
                    <StyledTableCell>{question.qu}</StyledTableCell>
                  {question?.type === "LIST" && (
                    <StyledTableCell>{"RATING"}</StyledTableCell>
                  )}
                  {question?.type !== "LIST" && (
                    <StyledTableCell>{question.type}</StyledTableCell>
                  )}

                  <StyledTableCell>
                    {question.listOptions
                      ? question.listOptions.map((option, l) => (
                          <li key={l}>{option?.listValue}</li>
                        ))
                      : "(Empty)"}
                  </StyledTableCell>
                    <StyledTableCell>
                    <Button
                          size="small"
                          color="secondary"
                          // onClick={() =>
                          //   handleopeninguypdatesurveyUserDialog(user)
                          // }
                        >
                          <EditOutlinedIcon color="inherit"/>
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                    <Button
                          // onClick={() => handleOpenDeleteDialog(user)}
                          size="small"
                          color="error"
                        >
                          <DeleteForeverOutlinedIcon />
                        </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody> */}
        </Table>
        {/* <TablePagination
            component="div"
            count={questionCount?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      </TableContainer>
      {/* ) : (
          <p>NO QuestionnariesQuestion FOUND !</p>
        )} */}
    </div>
  );
};

export default withSuspense(QuestionnariesQuestion);
