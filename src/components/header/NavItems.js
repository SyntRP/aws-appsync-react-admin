import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

export const NavItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: DashboardCustomizeOutlinedIcon,
  },
  {
    path: "/surveys",
    name: "Surveys",
    icon: StackedLineChartOutlinedIcon,
  },
  {
    path: "/questionnaries",
    name: "Questionnaries",
    icon: QuestionAnswerOutlinedIcon,
  },
  {
    name: "Divider",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: AnalyticsOutlinedIcon,
  },
];
