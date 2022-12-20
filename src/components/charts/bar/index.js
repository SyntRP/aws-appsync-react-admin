import { Paper } from "@mui/material";
import { useTheme } from "@mui/system";
import Chart from "react-apexcharts";
import {
  CHART_FORECOLOR,
  CHART_HEIGHT,
  CHART_PDF_DOWNLOAD_ICON,
  CHART_THEME_MODE,
  dowloadChartAsPDF,
} from "../../../config/ChartConfig";

const SimpleBarChart = ({
  data,
  title,
  xAxisFormatter,
  id,
  onClick,
  seriesName,
  yAxisTitle,
}) => {
  const theme = useTheme();

  const color = theme.palette.secondary.main;
  const chartData = Object.entries(data)
    ?.map(([name, obj]) => obj)
    ?.sort((a, b) => b?.y - a?.y);

  const options = {
    chart: {
      id,
      events: {
        dataPointSelection: onClick,
      },
      foreColor: CHART_FORECOLOR,
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
    xaxis: {
      type: "category",
      labels: {
        trim: true,
        hideOverlappingLabels: false,
        formatter: xAxisFormatter,
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
      },
    },
    title: {
      text: title,
      align: "center",
    },
    colors: Array(chartData.length).fill(color),
    tooltip: {
      fillSeriesColor: true,
      intersect: true,
      shared: false,
    },
    markers: {
      size: 1,
    },
    theme: {
      mode: CHART_THEME_MODE,
    },
  };

  const series = [
    {
      name: seriesName,
      data: chartData,
    },
  ];

  return (
    <Paper variant="elevation" elevation={8} sx={{ p: 0.35 }}>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={CHART_HEIGHT}
      />
    </Paper>
  );
};

export default SimpleBarChart;
