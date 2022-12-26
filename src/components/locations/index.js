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
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { LIST_SURVEY_LOCATIONS } from "../../graphql/custom/queries";
import DynamicModel from "../reusable/DynamicModel";
import useToggle from "../../helpers/hooks/useToggle";
import DeleteModel from "../reusable/DeleteModel";
import SearchBar from "../reusable/SearchBar";
import { UPDATE_SURVEY_LOCATION } from "../../graphql/custom/mutations";

const UpdateLocation = lazy(() => import("./UpdateLocation"));

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

const Locations = () => {
  const {
    open: updateOpen,
    toggleOpen: updateToggleOpen,
    setOpen: setUpdateOpen,
  } = useToggle();
  const {
    open: deleteModelOpen,
    setOpen: setDeleteModelOpen,
    toggleOpen: toggledeleteModelOpen,
  } = useToggle(false);
  const { loading, error, data } = useQuery(LIST_SURVEY_LOCATIONS);
  const [surveyLocations, setSurveyLocations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentLocation, setCurrentLocation] = useState({});
  const [search, setSearch] = useState({});
  const openUpdateDialog = Boolean(updateOpen) && Boolean(currentLocation?.id);

  const [deleteLocation] = useMutation(UPDATE_SURVEY_LOCATION, {
    refetchQueries: [
      {
        query: LIST_SURVEY_LOCATIONS,
        variables: {
          filter: { deleted: { ne: true } },
        },
      },
    ],
  });

  useEffect(() => {
    if (!loading && !error)
      setSurveyLocations(
        data?.listSurveyLocations?.items
          ?.slice()
          ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
  }, [loading, data?.listSurveyLocations?.items]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleLocationUpdateDialog = (loc) => {
    const { location = "", inchargeEmail = "", id } = loc;
    setCurrentLocation({
      location,
      inchargeEmail,
      id,
    });
    setUpdateOpen(true);
  };
  const handleupdateToggleOpen = () => {
    setCurrentLocation({});
    updateToggleOpen();
  };
  const handleLocationDeleteDialog = (loc) => {
    const { id, location } = loc;
    setCurrentLocation({id, location});
    setDeleteModelOpen(true);
  };
  const onClickDelete = async () => {
    const deleteLocationQuery = {
      id: currentLocation?.id,
      deleted: true,
    };
    await deleteLocation({ variables: { input: deleteLocationQuery } });
    toggledeleteModelOpen(false);
  };
  const locationSearch = (searched) => {
    setSearch(
      surveyLocations.filter((item) =>
        item?.location
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase()) ||
          item?.inchargeEmail
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
        dialogTitle={`Update  ${currentLocation?.location}`}
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <UpdateLocation
            toggle={handleupdateToggleOpen}
            initialFormValues={currentLocation}
          />
        </Suspense>
      </DynamicModel>
      <DeleteModel
        open={deleteModelOpen}
        toggle={toggledeleteModelOpen}
        onClickConfirm={onClickDelete}
        dialogTitle={`Remove this - ${currentLocation?.location} Location`}
        dialogContentText={`Are You Sure You Want to Remove this - ${currentLocation?.location} Location?`}
      />
      <SearchBar searchInput={(e) => locationSearch(e.target.value)} />
      {surveyLocations.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S No</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(search?.length > 0 ? search : surveyLocations)
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((loc, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell>{loc?.location}</StyledTableCell>
                    <StyledTableCell>{loc?.inchargeEmail}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleLocationUpdateDialog(loc)}
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => handleLocationDeleteDialog(loc)}
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
            count={surveyLocations?.length || search?.length}
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
        <p>NO SURVEY LOCATION FOUND !</p>
      )}
    </>
  );
};

export default Locations;
