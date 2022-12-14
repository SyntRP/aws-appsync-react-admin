import Analytics from "../components/analytics";
import { Loader } from "../components/common/Loader";
import withSuspense from "../helpers/hoc/withSuspense";
import useSurveyEntries from "../helpers/hooks/useSurveyEntries";

const AnalyticsPage = () => {
  const { loading, surveyEntries } = useSurveyEntries();
  if (loading) {
    return <Loader />;
  }
  return <Analytics surveyEntriesData={surveyEntries} />;
};

export default withSuspense(AnalyticsPage);
