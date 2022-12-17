import SurveyEntries from "../components/survey-entries";
import useSurveyEntries from "../helpers/hooks/useSurveyEntries";

const SurveyEntriesPage = () => {
  const { loading, surveyEntries } = useSurveyEntries();
  return <SurveyEntries />;
};

export default SurveyEntriesPage;
