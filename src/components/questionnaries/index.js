import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { lazy, Suspense, useState } from "react";
import withSuspense from "../../helpers/hoc/withSuspense";
import usePagination from "../../helpers/hooks/usePagination";
import useToggle from "../../helpers/hooks/useToggle";
import { Loader } from "../common/Loader";
import CreateCard from "../reusable/CreateCard";
import DynamicModel from "../reusable/DynamicModel";
import SearchBar from "../reusable/SearchBar";
import QuestionnarieCard from "./QuestionnarieCard";

const CreateQuestionnarie = lazy(() => import("./CreateQuestionnarie"));

const Questionnaries = ({ questionnaires }) => {
  const { open, toggleOpen } = useToggle();
  const [page, setPage] = useState(1);
  const [questionnaireSearch, setQuestionnaireSearch] = useState("");
  const PER_PAGE = 8;
  const questyionnairesList = questionnaires
    ?.filter((item) =>
      item?.name
        .toString()
        .toLowerCase()
        .includes(questionnaireSearch.toString().toLowerCase())
    )
    ?.slice()
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const count = Math.ceil(questyionnairesList?.length / PER_PAGE);
  const data = usePagination(questyionnairesList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    data.jump(p);
  };

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
      <Grid container spacing={2} sx={{ p: "0.5rem" }}>
        <Grid item xs={6}>
          <Typography variant="h6">Questionnaires</Typography>
        </Grid>
        <Grid item xs={6}>
          <SearchBar
            searchInput={(e) => setQuestionnaireSearch(e.target.value)}
          />
        </Grid>
      </Grid>

      {questionnaires.length > 0 ? (
        <>
          <Grid container spacing={2} alignItems="stretch" sx={{ p: "0.5rem" }}>
            <Grid item xs={12} cm={6} md={4}>
              <CreateCard title="Create Questionnaire" onClick={toggleOpen} />
            </Grid>
            {data?.currentData()?.map((questionnarie, i) => (
              <Grid item xs={12} cm={6} md={4} key={i}>
                <QuestionnarieCard
                  questionnarie={questionnarie}
                  sx={{ height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="end" my={2}>
            <Pagination
              count={count || data?.length}
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
        <p>No Questionnaires found</p>
      )}
    </div>
  );
};

export default withSuspense(Questionnaries);
