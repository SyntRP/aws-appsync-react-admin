import { Paper } from "@mui/material";
import Chart from "react-apexcharts";
import {
  CHART_FORECOLOR,
  CHART_HEIGHT,
  CHART_PDF_DOWNLOAD_ICON,
  CHART_THEME_MODE,
  dowloadChartAsPDF,
} from "../../../config/ChartConfig";

const SimpleLineChart = ({ data, title, id, seriesName, yAxisTitle }) => {
  const chartData = Object.entries(data)
    ?.map(([name, obj]) => obj)
    ?.sort((a, b) => new Date(b.x).getTime() - new Date(a.x).getTime());

  const series = [
    {
      name: seriesName,
      data: chartData,
    },
  ];
  const options = {
    chart: {
      id,
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
      toolbar: {
        tools: {
          customIcons: [
            {
              ...CHART_PDF_DOWNLOAD_ICON,
              click: async () =>
                await dowloadChartAsPDF({ ID: id, docName: title }),
            },
          ],
        },
        export: {
          csv: {
            filename: title,
            columnDelimiter: ",",
            headerCategory: title,
            headerValue: yAxisTitle,
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: title,
          },
          png: {
            filename: title,
          },
        },
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
      text: title,
      align: "left",
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
      type: "category",
      labels: {
        trim: true,
        hideOverlappingLabels: false,
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
      },
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
