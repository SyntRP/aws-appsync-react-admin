import { useQuery, useMutation } from "@apollo/client";
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
import { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { LIST_SURVEY_USERS } from "../../graphql/custom/queries";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import DeleteModel from "../reusable/DeleteModel";
import SearchBar from "../reusable/SearchBar";
import { UPDATE_SURVEY_USER } from "../../graphql/custom/mutations";


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
  const [search, setSearch] = useState({});
  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggledeleteModelOpen,
  } = useToggle(false);

  const [deleteUser] = useMutation(UPDATE_SURVEY_USER, {
    refetchQueries: [
      {
        query: LIST_SURVEY_USERS,
        variables: {
          filter: { deleted: { ne: true } },
        },
      },
    ],
  });

  const openUpdateDialog = Boolean(updateOpen) && Boolean(currentUser?.id);
  useEffect(() => {
    if (!loading && !error)
      setUsers(
        data?.listSurveyUsers?.items
          ?.slice()
          ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
  }, [loading, data?.listSurveyUsers?.items]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  const handleUserDeleteDialog = (user) => {
    const { id,name } = user;
    setCurrentUser({ id , name });
    setDeleteModelOpen(true);
  };
  const onClickDelete = async () => {
    const deleteUserQuery = {
      id: currentUser?.id,
      deleted: true,
    };
    await deleteUser({ variables: { input: deleteUserQuery } });
    toggledeleteModelOpen(false);
  };
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
  const userSearch = (searched) => {
    setSearch(
      users.filter((item) =>
        item?.name
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase()) ||
          item?.email
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase())
      )
    );
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
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggledeleteModelOpen}
        onClickConfirm={onClickDelete}
        dialogTitle={`Remove this - ${currentUser?.name} User`}
        dialogContentText={`Are You Sure You Want to Remove this ${currentUser?.name} User?`}
      />
      <SearchBar searchInput={(e) => userSearch(e.target.value)} />
      {users.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
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
              {(search?.length > 0 ? search : users)
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((user, i) => (
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
                        onClick={() => handleUserDeleteDialog(user)}
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
            count={users?.length || search?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        </TableContainer>
      ) : (
        <p>NO USERS FOUND !</p>
      )}
    </>
  );
};

export default Users;
