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
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  styled,
  tableCellClasses,
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
            questionQuestionnaireId={questionnarieData?.id}
          />
        </Suspense>
      </DynamicModel>
      <Grid container spacing={2} sx={{ py: "0.5rem" }}>
        <Grid item xs={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/questionnaries">
              <Typography variant="h6"> Questionnarie</Typography>
            </Link>

            <Typography color="text.primary" variant="h6">
              Question
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={6}>
          {/* <SearchBar searchInput={(e) => setSurveySearch(e.target.value)} /> */}
        </Grid>
      </Grid>
      <QuestionnarieDetailCard questionnarieData={questionnarieData} />
      <TableContainer
        elevation={10}
        component={Paper}
        sx={{ overflowX: "auto", width: "100%" }}
      >
        <Table sx={{ minWidth: "350px" }} aria-label="questions table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Q.No</StyledTableCell>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>List Options</StyledTableCell>
              <StyledTableCell>Manage</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {questions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((quest, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {quest?.order}
                  </StyledTableCell>
                  <StyledTableCell>{quest.qu}</StyledTableCell>
                  {quest?.type === "LIST" && <TableCell>{"RATING"}</TableCell>}
                  {quest?.type !== "LIST" && (
                    <StyledTableCell>{quest.type}</StyledTableCell>
                  )}

                  <StyledTableCell>
                    {quest?.listOptions
                      ? quest.listOptions.map((option, l) => (
                          <li key={l}>{option?.listValue}</li>
                        ))
                      : "(Empty)"}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleQuestionUpdateDialog(quest)}
                    >
                      <EditOutlinedIcon color="inherit" />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleSurveyDeleteDialog(quest)}
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
