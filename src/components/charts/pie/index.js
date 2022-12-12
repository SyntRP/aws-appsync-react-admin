import Chart from "react-apexcharts";
import { CHART_HEIGHT, CHART_THEME_MODE } from "../../../config/ChartConfig";

const SimplePieChart = () => {
  const options = {
    series: [44, 55, 41, 17, 15],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    title: {
      text: "Gradient Donut",
    },
    theme: {
      mode: CHART_THEME_MODE,
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <Chart
      options={options}
      series={options.series}
      type="donut"
      width="100%"
      height={CHART_HEIGHT}
    />
  );
};

export default SimplePieChart;
