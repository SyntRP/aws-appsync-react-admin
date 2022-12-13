import { useQuery } from "@apollo/client";
import { lazy, useEffect, useState } from "react";
import { Loader } from "../components/common/Loader";
import { LIST_QUESTIONNARIES } from "../graphql/custom/queries";
import withSuspense from "../helpers/hoc/withSuspense";

const Questionnaries = lazy(() => import("../components/questionnaries"));

const QuestionnariesPage = () => {
  const variables = {
    filter: { archived: { ne: true } },
  };
  const {
    loading: listQuestionnairesLoading,
    error: listQuestionnairesError,
    data: listQuestionnairesData,
  } = useQuery(LIST_QUESTIONNARIES, {
    variables,
  });
  const [questionnaires, setQuestionnaries] = useState([]);
  const handleFetchingData = () => {
    const allQuestionnaires = listQuestionnairesData?.listQuestionnaires;
    if (allQuestionnaires) {
      const { items } = allQuestionnaires;
      if (items?.length > 0) setQuestionnaries(items);
    }
  };
  useEffect(() => {
    handleFetchingData();
  }, [listQuestionnairesData]);
  if (listQuestionnairesLoading) {
    return <Loader />;
  }
  if (listQuestionnairesError) {
    return <div> Error while fetching questionnaries....</div>;
  }
  return <Questionnaries questionnaires={questionnaires} />;
};

export default withSuspense(QuestionnariesPage);
