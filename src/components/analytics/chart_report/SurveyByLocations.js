/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import withSuspense from "../../../helpers/hoc/withSuspense";
import SimpleBarChart from "../../charts/bar";
import { bindTitle } from "../../../config/ChartConfig";

const CHART_ID = "survey_by_locations";
const TITLE = "Survey By Locations";

const SurveyByLocations = ({
  data,
  setSelectedLocation,
  fromDate,

  endDate,
}) => {
  const [date, setDate] = useState(TITLE);
  const chartData = data?.reduce((chartData, { location }) => {
    if (location?.id) {
      const x = location?.id || "no-loc";
      const y = (chartData[x]?.y || 0) + 1;
      const loc = {
        x,
        y,
      };
      chartData[x] = loc;
    }
    return chartData;
  }, {});
  const onClick = (event, chartContext, config) => {
    const locationId =
      config.w.config.series[0]?.data[config.dataPointIndex]?.x;
    setSelectedLocation(locationId);
  };
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
        onClick={onClick}
        xAxisFormatter={xAxisFormatter}
        yAxisTitle="Count"
        title={date}
        id={CHART_ID}
        seriesName="Survey"
      />
    </>
  );
};

export default withSuspense(SurveyByLocations);
