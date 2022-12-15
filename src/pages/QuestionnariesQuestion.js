import React from "react";
import QuestionnariesQuestion from "../components/questionnaries-question";
import withSuspense from "../helpers/hoc/withSuspense";

const QuestionnariesQuestionPage = () => {
  return (
    <div>
      <QuestionnariesQuestion />
    </div>
  );
};

export default withSuspense(QuestionnariesQuestionPage);
