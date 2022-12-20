import { useQuery } from "@apollo/client";
import useSurveyEntries from "../helpers/hooks/useSurveyEntries";
import { Loader } from "../components/common/Loader";
import Dashboard from "../components/dashboard";
import withSuspense from "../helpers/hoc/withSuspense";
import {
  COUNT_SURVEYS,
  COUNT_SURVEY_LOCATIONS,
  COUNT_SURVEY_USERS,
} from "../graphql/custom/queries";

const DashboardPage = () => {
  const { loading, surveyEntries } = useSurveyEntries();
  const {
    loading: surveyCountLoading,
    error: surveyCountError,
    data: surveyCountData,
  } = useQuery(COUNT_SURVEYS);
  const {
    loading: surveyLocationCountLoading,
    error: surveyLocationCountError,
    data: surveyLocationCountData,
  } = useQuery(COUNT_SURVEY_LOCATIONS);
  const {
    loading: surveyUsersCountLoading,
    error: surveyUsersCountError,
    data: surveyUsersCountData,
  } = useQuery(COUNT_SURVEY_USERS);
  const overviewReady =
    Boolean(surveyCountLoading) ||
    Boolean(surveyCountError) ||
    Boolean(surveyLocationCountLoading) ||
    Boolean(surveyLocationCountError);
  Boolean(surveyUsersCountLoading) || Boolean(surveyUsersCountError);
  if (loading) {
    return <Loader />;
  }
  return (
    <Dashboard
      surveyEntries={surveyEntries}
      overviewReady={overviewReady}
      surveyCount={surveyCountData?.listSurveys?.items?.length || 0}
      surveyLocationsCount={
        surveyLocationCountData?.listSurveyLocations?.items?.length || 0
      }
      surveyUsersCount={
        surveyUsersCountData?.listSurveyUsers?.items?.length || 0
      }
    />
  );
};

export default withSuspense(DashboardPage);
