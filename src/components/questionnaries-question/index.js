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
import useIdQuery from "../../helpers/hooks/useIdQuery";
import { useParams } from "react-router";

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
  const params = useParams();
  const query = useIdQuery();
  const qid = query.get("Qid");
  const [question, setQuestion] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { loading, error, data } = useQuery(GET_QUESTIONNAIRES, {
    variables: {
      id: params.id,
    },
  });

  const questionnaireQuestionOrder = data?.getQuestionnaire?.question?.items
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!loading && !error) {
      setQuestion(
        data?.getQuestionnaire?.question?.items
          ?.slice()
          ?.sort((a, b) => a?.order - b?.order)
      );
    }
  }, [loading, data?.getQuestionnaire?.question?.items]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  return (
    <div>
      {question.length > 0 ? (
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
            <TableBody>
              {question.map((quest, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {quest?.order}
                  </StyledTableCell>
                  <StyledTableCell>{quest.qu}</StyledTableCell>
                  {quest?.type === "LIST" && (
                    <StyledTableCell>{"RATING"}</StyledTableCell>
                  )}
                  {quest?.type !== "LIST" && (
                    <StyledTableCell>{quest.type}</StyledTableCell>
                  )}

                  <StyledTableCell>
                    {quest.listOptions
                      ? quest.listOptions.map((option, l) => (
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
                      <EditOutlinedIcon color="inherit" />
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
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={questionnaireQuestionOrder?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p>NO QuestionnariesQuestion FOUND !</p>
      )}
    </div>
  );
};

export default withSuspense(QuestionnariesQuestion);
