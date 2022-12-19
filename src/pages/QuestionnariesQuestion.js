import React, { lazy, Suspense } from "react";
import { Loader } from "../components/common/Loader";
import QuestionnariesQuestion from "../components/questionnaries-question";
import CreateButton from "../components/reusable/CreateButton";
import DynamicModel from "../components/reusable/DynamicModel";
import withSuspense from "../helpers/hoc/withSuspense";
import useToggle from "../helpers/hooks/useToggle";

const CreateQuestion = lazy(() => import("../components/questionnaries-question/CreateQuestion"));

const QuestionnariesQuestionPage = () => {
  const { open, toggleOpen } = useToggle();

  return (
    <div>
      <DynamicModel
        dialogTitle="Create Question "
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <CreateQuestion toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>
      <QuestionnariesQuestion />
      <CreateButton onClick={toggleOpen} />
    </div>
  );
};

export default withSuspense(QuestionnariesQuestionPage);
