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
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import { Suspense } from "react";
import { useMutation } from "@apollo/client";
import { Loader } from "../common/Loader";
import { lazy } from "react";
import DeleteModel from "../reusable/DeleteModel";
import {
  GET_QUESTIONNAIRES,
  LIST_QUESTIONNARIES,
  LIST_QUESTIONS,
} from "../../graphql/custom/queries";
import { UPDATE_QUESTION } from "../../graphql/custom/mutations";

const UpdateQuestion = lazy(() => import("./UpdateQuestion"));

const QuestionnariesQuestion = ({ questions, questionnarieData }) => {
  const [page, setPage] = useState(0);
  const {
    open: updateOpen,
    toggleOpen: updateToggleOpen,
    setOpen: setUpdateOpen,
  } = useToggle();

  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggleDeleteModelOpen,
  } = useToggle(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const openUpdateDialog = Boolean(updateOpen) && Boolean(currentQuestion?.id);

  const [deleteQuestion] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONNAIRES,
        variables: {
          id: questionnarieData?.id,
        },
      },
    ],
  });

  const handleQuestionUpdateDialog = (question) => {
    setCurrentQuestion(question);
    setUpdateOpen(true);
  };
  const handleSurveyDeleteDialog = (survey) => {
    const { id } = survey;
    setCurrentQuestion({
      id,
    });
    setDeleteModelOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleQuestionToggleOpen = () => {
    setCurrentQuestion({});
    updateToggleOpen(true);
  };

  const onClickDelete = async () => {
    const DeleteSurveyQuery = {
      id: currentQuestion?.id,

      deleted: true,
    };
    await deleteQuestion({ variables: { input: DeleteSurveyQuery } });
    toggleDeleteModelOpen();
  };

  return (
    <>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggleDeleteModelOpen}
        onClickConfirm={onClickDelete}
        isClose
        dialogTitle="Delete "
        dialogContentText={`Are You Sure You Want to Delete  question?`}
      />

      <DynamicModel
        dialogTitle={`Update - ${currentQuestion?.qu}`}
        open={openUpdateDialog}
        toggle={handleQuestionToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <UpdateQuestion
            toggle={handleQuestionToggleOpen}
            currentQuestion={currentQuestion}
            questions={questions}
          />
        </Suspense>
      </DynamicModel>

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
            {questions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((quest, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {quest?.order}
                  </TableCell>
                  <TableCell>{quest.qu}</TableCell>
                  {quest?.type === "LIST" && <TableCell>{"RATING"}</TableCell>}
                  {quest?.type !== "LIST" && (
                    <TableCell>{quest.type}</TableCell>
                  )}

                  <TableCell>
                    {quest?.listOptions
                      ? quest.listOptions.map((option, l) => (
                          <li key={l}>{option?.listValue}</li>
                        ))
                      : "(Empty)"}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleQuestionUpdateDialog(quest)}
                    >
                      <EditOutlinedIcon color="inherit" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleSurveyDeleteDialog(quest)}
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
