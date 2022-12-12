import Surveys from "../components/surveys";
import withSuspense from "../helpers/hoc/withSuspense";

const SurveysPage = () => {
  return <Surveys />;
};

export default withSuspense(SurveysPage);
