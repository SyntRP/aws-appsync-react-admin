import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    path: "/users",
    name: "Users",
    icon: PersonIcon,
  },
  {
    path: "/locations",
    name: "Locations",
    icon: LocationOnIcon,
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
