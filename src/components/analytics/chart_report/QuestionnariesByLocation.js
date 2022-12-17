import withSuspense from "../../../helpers/hoc/withSuspense";
import SimpleDonutChart from "../../charts/donut";
import { Loader } from "../../common/Loader";

const CHART_ID = "questionnarie_by_location";
const TITLE = "Questionnarie By Location";

const QuestionnariesByLocation = ({
  data,
  questionariesName,
  loading,
  error,
  selectedLocation,
}) => {
  const locationName =
    data?.find((d) => d?.location?.id === selectedLocation)?.location
      ?.location || "";
  const chartData = data
    ?.filter((d) => d?.location?.id === selectedLocation)
    ?.reduce((chartData, { questionnaireId }) => {
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
      {selectedLocation && !error ? (
        <SimpleDonutChart
          id={CHART_ID}
          data={chartData}
          title={TITLE + " - " + locationName}
          labels={questionariesName.listQuestionnaires.items}
        />
      ) : (
        loading && <Loader />
      )}
    </>
  );
};

export default withSuspense(QuestionnariesByLocation);
