import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

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
    name: "Questionnaires",
    icon: QuestionAnswerOutlinedIcon,
  },
  {
    name: "Divider",
  },
  {
    path: "/users",
    name: "Users",
    icon: Person2OutlinedIcon,
  },
  {
    path: "/locations",
    name: "Locations",
    icon: PinDropOutlinedIcon,
  },
  {
    name: "Divider",
  },
  // {
  //   path: "/qrcoderesponses",
  //   name: "QR Responses",
  //   icon: QrCode2OutlinedIcon,
  // },
  // {
  //   path: "/linkresponses",
  //   name: "Link Responses",
  //   icon: InsertLinkOutlinedIcon,
  // },
  {
    path: "/surveyEntries",
    name: "SurveyEntries",
    icon: InventoryOutlinedIcon,
  },
  {
    name: "Divider",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: AnalyticsOutlinedIcon,
  },
  {
    name: "Divider",
  },
  {
    path: "/archived",
    name: "Archived",
    icon: ArchiveOutlinedIcon,
  },
];
