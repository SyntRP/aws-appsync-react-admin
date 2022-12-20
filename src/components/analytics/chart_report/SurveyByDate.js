import moment from "moment";
import React, { useEffect, useState } from "react";
import { bindTitle } from "../../../config/ChartConfig";
import SimpleLineChart from "../../charts/line";
import { Loader } from "../../common/Loader";

const CHART_ID = "SurveyEntries_by_date";
const TITLE = "SurveyEntries By Date";

const SurveyByDate = ({
  data,
  loading,
  error,
  fromDate,

  endDate,
}) => {
  const [date, setDate] = useState(TITLE);
  const chartData = data?.reduce((chartData, data) => {
    const x =
      moment(data?.finishTime).format("YYYY-MM-DD") ||
      "no SurveyEntry on this date";

    const y = (chartData[x]?.y || 0) + 1;
    const date = {
      x,

      y,
    };
    chartData[x] = date;

    return chartData;
  }, {});

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
      {loading ? (
        <Loader />
      ) : (
        !error && (
          <SimpleLineChart
            data={chartData}
            seriesName="SurveyEntry"
            title={date}
            id={CHART_ID}
            yAxisTitle="Count"
          />
        )
      )}
    </>
  );
};

export default SurveyByDate;
