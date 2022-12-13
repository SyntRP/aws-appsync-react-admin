import { Grid } from "@mui/material";
import withSuspense from "../../helpers/hoc/withSuspense";
import CreateCard from "../reusable/CreateCard";
import QuestionnarieCard from "./QuestionnarieCard";

const Questionnaries = ({ questionnaires }) => {
  return (
    <div>
      {questionnaires.length > 0 ? (
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} cm={6} md={4}>
            <CreateCard title="Create Questionnarie" />
          </Grid>
          {questionnaires.map((questionnarie, i) => (
            <Grid item xs={12} cm={6} md={4} key={i}>
              <QuestionnarieCard
                questionnarie={questionnarie}
                sx={{ height: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No Questionnaries found</p>
      )}
    </div>
  );
};

export default withSuspense(Questionnaries);
