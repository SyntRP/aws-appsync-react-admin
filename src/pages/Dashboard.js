import Dashboard from "../components/dashboard";
import withSuspense from "../helpers/hoc/withSuspense";

const DashboardPage = () => {
  return <Dashboard />;
};

export default withSuspense(DashboardPage);
