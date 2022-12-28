import withSuspense from "../../../helpers/hoc/withSuspense";
import SimpleBarChart from "../../charts/bar";
import SimpleDonutChart from "../../charts/donut";
import { Loader } from "../../common/Loader";

const CHART_ID = "Location_by_questionnarie";
const TITLE = "Location By Questionnarie  ";

const LocationByQuestionnaire = ({
  data,
  questionariesName,
  loading,
  error,
  selectedQuestionnarie,
}) => {
  const onGettingQuestionnaireByname = (name) => {
    const que = questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.name === name
    );

    return que?.id ?? name;
  };

  const questionarieName =
    questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.id === onGettingQuestionnaireByname(selectedQuestionnarie)
    ) || "";

  const chartData = data
    ?.filter((data) => data?.location?.location)
    ?.filter(
      (d) =>
        d?.questionnaireId ===
        onGettingQuestionnaireByname(selectedQuestionnarie)
    )
    ?.reduce((chartData, { location }) => {
      if (location?.id) {
        const x = location?.location || "no-loc";

        const y = (chartData[x]?.y || 0) + 1;

        const loc = {
          x,
          y,
        };
        chartData[x] = loc;
      }
      return chartData;
    }, {});

  return (
    <>
      {selectedQuestionnarie && !error ? (
        <SimpleBarChart
          id={CHART_ID}
          data={chartData}
          title={TITLE + " - " + questionarieName?.name}
          labels={questionariesName.listQuestionnaires.items}
        />
      ) : (
        loading && <Loader />
      )}
    </>
  );
};

export default withSuspense(LocationByQuestionnaire);
