import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { LIST_SURVEYS } from "../../graphql/custom/queries";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";

import CreateCard from "../reusable/CreateCard";
import DynamicModel from "../reusable/DynamicModel";
import withSuspense from "../../helpers/hoc/withSuspense";
import SurveyCard from "./SurveyCard";
const CreateSurvey = lazy(() =>
  import("../../components/surveys/CreateSurvey")
);
const Surveys = () => {
  const { open, toggleOpen } = useToggle();
  const { loading, error, data } = useQuery(LIST_SURVEYS, {
    variables: { filter: { archived: { ne: true } }, limit: 10 },
  });
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    if (!loading && !error) setSurveys(data?.listSurveys?.items);
  }, [loading]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <>error</>;
  }
  return (
    <div>
      <DynamicModel
        dialogTitle="Create Survey"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <CreateSurvey toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>
      {surveys.length > 0 ? (
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} cm={6} md={4}>
            <CreateCard title="Create Survey" onClick={toggleOpen} />
          </Grid>
          {surveys.map((survey, i) => (
            <Grid item xs={12} cm={6} md={4} key={i}>
              <SurveyCard survey={survey} sx={{ height: "100%" }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No surveys found</p>
      )}
    </div>
  );
};

export default withSuspense(Surveys);
