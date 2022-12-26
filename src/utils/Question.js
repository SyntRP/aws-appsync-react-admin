export const questionQuery = (values) => {
  const {
    question,
    order,
    currentMode,
    type,
    nextQuestion,
    dependentQuestion,
    dependentQuestionOptions,
    listItemOptions,
  } = values;
  let createQuestionQuery = {
    qu: question,
    type: type,
    order: order,
  };

  if (currentMode === "dependent") {
    const dependentQuestionQuery = {
      id: dependentQuestion,
      options: dependentQuestionOptions,
    };
    createQuestionQuery.isDependent = true;
    createQuestionQuery.dependent = dependentQuestionQuery;
    if (listItemOptions.length > 0)
      createQuestionQuery.listOptions = listItemOptions;
  }

  if (currentMode === "self") {
    createQuestionQuery.isSelf = true;
    if (type === "TEXT" || type === "LIST") {
      createQuestionQuery.listOptions = {
        listValue: type,
        nextQuestion: nextQuestion,
      };
    }
  }
  if (type === "RADIO") {
    if (listItemOptions.length > 0)
      createQuestionQuery.listOptions = listItemOptions;
  }
  if (type === "CHECKBOX") {
    if (listItemOptions.length > 0)
      createQuestionQuery.listOptions = listItemOptions.map((option) => ({
        listValue: option?.listValue,
        nextQuestion,
      }));
  }
  return createQuestionQuery;
};
