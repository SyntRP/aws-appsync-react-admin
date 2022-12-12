import Questionnaries from "../components/questionnaries";
import withSuspense from "../helpers/hoc/withSuspense";

const QuestionnariesPage = () => {
  return <Questionnaries />;
};

export default withSuspense(QuestionnariesPage);
