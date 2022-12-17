import {
  Box,
  Breadcrumbs,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  Button,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useQuery } from "@apollo/client";
import { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";

const UpdateUser = lazy(() => import("./UpdateUser"));

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

const Users = () => {
  const {
    open: updateOpen,
    toggleOpen: updateToggleOpen,
    setOpen: setUpdateOpen,
  } = useToggle();
  const { loading, error, data } = useQuery(LIST_SURVEY_USERS);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentUser, setCurrentUser] = useState({});

  const surveyUserOrder = data?.listSurveyUsers?.items
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const openUpdateDialog = Boolean(updateOpen) && Boolean(currentUser?.id);
  useEffect(() => {
    if (!loading && !error) setUsers(data?.listSurveyUsers?.items);
  }, [loading, data?.listSurveyUsers?.items]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  const handleUserUpdateDialog = (user) => {
    const { name = "", email = "", id } = user;
    setCurrentUser({
      name,
      email,
      id,
    });
    setUpdateOpen(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleupdateToggleOpen = () => {
    setCurrentUser({});
    updateToggleOpen();
  };
  return (
    <>
      <DynamicModel
        open={openUpdateDialog}
        toggle={handleupdateToggleOpen}
        dialogTitle={`Update User ${currentUser?.name}`}
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <UpdateUser
            toggle={handleupdateToggleOpen}
            initialFormValues={currentUser}
          />
        </Suspense>
      </DynamicModel>
      {users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S No</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell>{user?.name}</StyledTableCell>
                  <StyledTableCell>{user?.email}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleUserUpdateDialog(user)}
                    >
                      <EditOutlinedIcon />
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
            count={surveyUserOrder?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p>NO USERS FOUND !</p>
      )}
    </>
  );
};

export default Users;
