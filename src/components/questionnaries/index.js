import { Grid, Pagination } from "@mui/material";
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
  const [search, setSearch] = useState(1);
  const PER_PAGE = 5;
  const questyionnairesList = questionnaires
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

  const questionnairesSearch = (searched) => {
    setSearch(
      questyionnairesList.filter((item) =>
        item?.name
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase())
      )
    );
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
      <SearchBar searchInput={(e) => questionnairesSearch(e.target.value)} />
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
        <p>No Questionnaires found</p>
      )}
    </div>
  );
};

export default withSuspense(Questionnaries);
