import { useState } from "react";
import {
  Paper,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import { useParams } from "react-router";

import {
  GET_SURVEYENTRIES,
  LIST_QUESTIONNARIES_NAME,
} from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
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
const StyledRating = styled(Rating)({
  iconFilled: {
    color: "red",
  },
  iconHover: {
    color: "orange",
  },
  iconEmpty: {
    color: "#484145",
  },
});

const SurveyResponses = () => {
  const params = useParams();

  const { data: questionariesName } = useQuery(LIST_QUESTIONNARIES_NAME);
  const { loading, error, data } = useQuery(GET_SURVEYENTRIES, {
    variables: {
      id: params.id,
    },
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const listans = data?.getSurveyEntries?.responses;
  const customIcons = {
    1: {
      icon: (
        <SentimentVeryDissatisfiedIcon
          style={{ width: "25px", height: "25px" }}
        />
      ),
      label: "Very Dissatisfied",
    },
    2: {
      icon: (
        <SentimentDissatisfiedIcon style={{ width: "25px", height: "25px" }} />
      ),
      label: "Dissatisfied",
    },
    3: {
      icon: (
        <SentimentSatisfiedIcon style={{ width: "25px", height: "25px" }} />
      ),
      label: "Neutral",
    },
    4: {
      icon: (
        <SentimentSatisfiedAltIcon style={{ width: "25px", height: "25px" }} />
      ),
      label: "Satisfied",
    },
    5: {
      icon: (
        <SentimentVerySatisfiedIcon style={{ width: "25px", height: "25px" }} />
      ),
      label: "Very Satisfied",
    },
  };
  function IconContainer(props) {
    const { value, ...other } = props;

    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // const questionCount = listans?.question?.items.sort(
  //   (a, b) => a?.order - b?.order
  // );
  const responses = listans?.items
    ?.slice()
    ?.sort((a, b) => a?.qu?.order - b?.qu?.order);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <Paper>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell> Q.No </StyledTableCell>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell>Answer</StyledTableCell>
              {/* <StyledTableCell>Manage</StyledTableCell> */}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {/* {listans?.items?.map((res, r) => ( */}
            {(rowsPerPage > 0
              ? responses?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : responses
            )?.map((res, r) => (
              <StyledTableRow key={r}>
                <StyledTableCell>{res?.qu?.order}</StyledTableCell>
                <StyledTableCell>{res?.qu?.qu}</StyledTableCell>
                {res?.qu?.type === "LIST" && (
                  <StyledTableCell>
                    {" "}
                    <StyledRating
                      defaultValue={res?.res}
                      name="read-only"
                      IconContainerComponent={IconContainer}
                      readOnly
                    />
                  </StyledTableCell>
                )}
                {res?.qu?.type !== "LIST" && (
                  <StyledTableCell>{res?.res}</StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={responses?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withSuspense(SurveyResponses);
