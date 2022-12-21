import { Grid } from "@mui/material";
import { lazy, Suspense } from "react";
import withSuspense from "../../helpers/hoc/withSuspense";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";
import CreateCard from "../reusable/CreateCard";
import DynamicModel from "../reusable/DynamicModel";
import QuestionnarieCard from "./QuestionnarieCard";

const CreateQuestionnarie = lazy(() => import("./CreateQuestionnarie"));

const Questionnaries = ({ questionnaires }) => {
  const { open, toggleOpen } = useToggle();

  return (
    <div>
      <DynamicModel
        dialogTitle="Create Questionnaire"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <CreateQuestionnarie toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>
      {questionnaires.length > 0 ? (
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} cm={6} md={4}>
            <CreateCard title="Create Questionnarie" onClick={toggleOpen} />
          </Grid>
          {questionnaires
            ?.slice()
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.map((questionnarie, i) => (
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
