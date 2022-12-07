import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { listSurveys } from "../../graphql/custom/queries";
import { Loader } from "../common/Loader";
import SurveyCard from "./SurveyCard";

const Surveys = () => {
  const { loading, error, data } = useQuery(gql(listSurveys), {
    variables: { limit: 10 },
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
      {surveys.length > 0 ? (
        <Grid container spacing={2} alignItems="stretch">
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

export default Surveys;
