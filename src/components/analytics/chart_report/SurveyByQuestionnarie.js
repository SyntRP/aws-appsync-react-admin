import withSuspense from "../../../helpers/hoc/withSuspense";
import SimpleDonutChart from "../../charts/donut";
import { Loader } from "../../common/Loader";

const CHART_ID = "survey_by_questionnaire";
const TITLE = "Survey By Questionnarie";
const SurveyByQuestionnarie = ({ data, questionariesName, loading, error }) => {
  const chartData = data?.reduce((chartData, { questionnaireId }) => {
    if (questionnaireId) {
      const x = questionnaireId || "no-questionnarie";
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
      {loading ? (
        <Loader />
      ) : (
        !error && (
          <SimpleDonutChart
            id={CHART_ID}
            data={chartData}
            title={TITLE}
            labels={questionariesName.listQuestionnaires.items}
          />
        )
      )}
    </>
  );
};

export default withSuspense(SurveyByQuestionnarie);
