import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid, Pagination } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { LIST_SURVEYS } from "../../graphql/custom/queries";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";
import withSuspense from "../../helpers/hoc/withSuspense";
import usePagination from "../../helpers/hooks/usePagination";
import { Box } from "@mui/system";
import ArchiveCard from "./ArchiveCard";

const CreateSurvey = lazy(() =>
  import("../../components/surveys/CreateSurvey")
);
const Archived = () => {
  const { open, toggleOpen } = useToggle();
  const { loading, error, data } = useQuery(LIST_SURVEYS, {
    variables: { filter: { archived: { eq: true } }, limit: 100 },
  });
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const surveysList = surveys
    ?.slice()
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const count = Math.ceil(surveysList?.length / PER_PAGE);
  const _DATA = usePagination(surveysList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    if (!loading && !error) setSurveys(data?.listSurveys?.items);
  }, [loading, data?.listSurveys?.items]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  return (
    <div>
      {surveys.length > 0 ? (
        <>
          <Grid container spacing={2} alignItems="stretch">
            {_DATA?.currentData()?.map((survey, i) => (
              <Grid item xs={12} cm={6} md={4} key={i}>
                <ArchiveCard survey={survey} sx={{ height: "100%" }} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="end" my={2}>
            <Pagination
              count={count}
              size="large"
              page={page}
              color="primary"
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        </>
      ) : (
        <p>No archived surveys found</p>
      )}
    </div>
  );
};

export default withSuspense(Archived);
