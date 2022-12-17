import { Paper } from "@mui/material";
import Chart from "react-apexcharts";
import {
  CHART_FORECOLOR,
  CHART_HEIGHT,
  CHART_PDF_DOWNLOAD_ICON,
  CHART_THEME_MODE,
  dowloadChartAsPDF,
} from "../../../config/ChartConfig";

const SimpleLineChart = () => {
  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  const options = {
    chart: {
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    colors: ["#7fb05d"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Survey by Date",
      align: "center",
    },
    theme: {
      mode: CHART_THEME_MODE,
    },
    grid: {
      row: {
        colors: ["#084975", "#084975"],
        opacity: 0.7,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <Paper variant="elevation" elevation={8} sx={{ p: 0.35, height: "100%" }}>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={CHART_HEIGHT}
      />
    </Paper>
  );
};

export default SimpleLineChart;
