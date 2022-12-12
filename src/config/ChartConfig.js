import ApexCharts from "apexcharts";
import { jsPDF } from "jspdf";
import PDFICON from "../assets/images/PDF_ICON.svg";

export const CHART_THEME_MODE = "dark";

export const CHART_HEIGHT = 440;

export const CHART_FORECOLOR = "#fcfcfc";

export const CHART_PDF_DOWNLOAD_ICON = {
  icon: `<img src=${PDFICON} width="16" class="PDF_ICON_CLASS"/>`,
  title: "Download PDF",
};

export const dowloadChartAsPDF = async ({ ID, docName = "chart.pdf" }) => {
  ApexCharts.exec(ID, "dataURI").then(({ imgURI }) => {
    const doc = new jsPDF();
    doc.addImage(imgURI, "PNG", 10, 30);
    doc.save(docName);
  });
};
