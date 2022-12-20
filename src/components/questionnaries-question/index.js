import { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import QuestionnarieDetailCard from "./QuestionnarieDetailCard";

const QuestionnariesQuestion = ({ questions, questionnarieData }) => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <QuestionnarieDetailCard questionnarieData={questionnarieData} />
      <TableContainer
        elevation={10}
        component={Paper}
        sx={{ overflowX: "auto", width: "100%" }}
      >
        <Table sx={{ minWidth: "350px" }} aria-label="questions table">
          <TableHead>
            <TableRow>
              <TableCell>Q.No</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>List Options</TableCell>
              <TableCell>Manage</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((quest, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {quest?.order}
                </TableCell>
                <TableCell>{quest.qu}</TableCell>
                {quest?.type === "LIST" && <TableCell>{"RATING"}</TableCell>}
                {quest?.type !== "LIST" && <TableCell>{quest.type}</TableCell>}

                <TableCell>
                  {quest.listOptions
                    ? quest.listOptions.map((option, l) => (
                        <li key={l}>{option?.listValue}</li>
                      ))
                    : "(Empty)"}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="secondary"
                    // onClick={() =>
                    //   handleopeninguypdatesurveyUserDialog(user)
                    // }
                  >
                    <EditOutlinedIcon color="inherit" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    // onClick={() => handleOpenDeleteDialog(user)}
                    size="small"
                    color="error"
                  >
                    <DeleteForeverOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          count={questions?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default QuestionnariesQuestion;
