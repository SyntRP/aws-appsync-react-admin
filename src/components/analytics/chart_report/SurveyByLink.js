import { useEffect, useState } from "react";
import SimpleBarChart from "../../charts/bar";
import { bindTitle } from "../../../config/ChartConfig";

const CHART_ID = "survey_by_Link";
const TITLE = "Survey By Link";

const SurveyByLink = ({
  data,

  fromDate,
  endDate,
  questionariesName,
}) => {
  const [date, setDate] = useState(TITLE);
  const onGettingQuestionnaireById = (id) => {
    const que = questionariesName?.listQuestionnaires?.items?.find(
      (q) => q?.id === id
    );

    return que?.name ?? id;
  };
  const chartData = data
    ?.filter((data) => data?.by?.name)
    ?.reduce((chartData, { questionnaireId }) => {
      if (questionnaireId) {
        const x =
          onGettingQuestionnaireById(questionnaireId) || "no-questionnarie";
        const y = (chartData[x]?.y || 0) + 1;
        const loc = {
          x,
          y,
        };
        chartData[x] = loc;
      }
      return chartData;
    }, {});
  //   const onClick = (event, chartContext, config) => {
  //     const locationId =
  //       config.w.config.series[0]?.data[config.dataPointIndex]?.x;
  //     setSelectedLinkQuestionnarie(locationId);
  //   };
  const xAxisFormatter = (value) => {
    const label =
      data.find((d) => d?.location?.id === value)?.location?.location || value;
    return label;
  };
  useEffect(() => {
    const fullTitle = bindTitle({
      TITLE,
      fromDate,
      endDate,
    });
    setDate(fullTitle);
  }, [fromDate, endDate]);

  return (
    <>
      <SimpleBarChart
        data={chartData}
        // onClick={onClick}
        xAxisFormatter={xAxisFormatter}
        yAxisTitle="Count"
        title={date}
        id={CHART_ID}
        seriesName="Survey"
      />
    </>
  );
};

export default SurveyByLink;
