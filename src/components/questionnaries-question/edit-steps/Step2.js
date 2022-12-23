import { Divider } from "@mui/material";
import React, { useMemo, useState } from "react";
import AutoCompleteSelect from "../../reusable/AutoComplete";
import DependentAutocomplete from "../DependentAutocomplete";
import ListOptions from "../ListOptions";

const initialValue = {
  listValue: "",
  nextQuestion: "",
};

const Step2 = ({
  currentMode,
  type,
  handleAutoCompleteChange,
  question,
  nexQuestionAU,
  dependentQuestion,
  dependentQuestionAU,
  handleSettingDependentNextQuestion,
  dependentQuestionOptionsAU,
  listItemOptions,
  setValues,
  getQuestionById,
}) => {
  const [listItem, setListItem] = useState(initialValue);

  const options = useMemo(
    () =>
      question?.map((question) => ({
        id: question?.id,
        label: question?.order + "  " + question?.qu,
      })),
    [question]
  );

  const getDependentQuestionListOptions = () => {
    const question = question?.find((que) => que?.id === dependentQuestion);
    const options = question?.listOptions?.map((l) => l?.listValue);
    return options ? options : [];
  };

  const handleAddingListItem = () => {
    setValues((prevState) => ({
      ...prevState,
      listItemOptions: [...prevState?.listItemOptions, listItem],
    }));
    setListItem(initialValue);
  };

  return (
    <>
      {currentMode === "self" && type === "TEXT" && (
        <AutoCompleteSelect
          handleAutoCompleteChange={(event, newValue) => {
            handleAutoCompleteChange(newValue, "nextQuestion", "nexQuestionAU");
          }}
          value={nexQuestionAU}
          label="Next Question"
          options={options}
        />
      )}
      {currentMode === "dependent" && type === "TEXT" && (
        <DependentAutocomplete
          dependentQuestionOptionsAU={dependentQuestionOptionsAU}
          dependentQuestionListOptions={getDependentQuestionListOptions()}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleSettingDependentNextQuestion={
            handleSettingDependentNextQuestion
          }
          options={options}
          dependentQuestionAU={dependentQuestionAU}
        />
      )}
      {currentMode === "self" && type === "RADIO" && (
        <ListOptions
          showNextQuestion={true}
          options={options}
          setListItem={setListItem}
          getQuestionById={getQuestionById}
          handleAddingListItem={handleAddingListItem}
          listItem={listItem}
          listItemOptions={listItemOptions}
        />
      )}
      {currentMode === "normal" &&
        (type === "RADIO" || type === "CHECKBOX") && (
          <ListOptions
            showNextQuestion={false}
            options={options}
            setListItem={setListItem}
            getQuestionById={getQuestionById}
            handleAddingListItem={handleAddingListItem}
            listItem={listItem}
            listItemOptions={listItemOptions}
          />
        )}
      {currentMode === "dependent" &&
        (type === "RADIO" || type === "CHECKBOX") && (
          <>
            <ListOptions
              showNextQuestion={false}
              options={options}
              setListItem={setListItem}
              getQuestionById={getQuestionById}
              handleAddingListItem={handleAddingListItem}
              listItem={listItem}
              listItemOptions={listItemOptions}
            />
            <Divider
              sx={{
                my: 2,
              }}
            />
            <DependentAutocomplete
              dependentQuestionOptionsAU={dependentQuestionOptionsAU}
              dependentQuestionListOptions={getDependentQuestionListOptions()}
              handleAutoCompleteChange={handleAutoCompleteChange}
              handleSettingDependentNextQuestion={
                handleSettingDependentNextQuestion
              }
              options={options}
              dependentQuestionAU={dependentQuestionAU}
            />
          </>
        )}
      {currentMode === "self" && type === "CHECKBOX" && (
        <>
          <ListOptions
            showNextQuestion={false}
            options={options}
            setListItem={setListItem}
            getQuestionById={getQuestionById}
            handleAddingListItem={handleAddingListItem}
            listItem={listItem}
            listItemOptions={listItemOptions}
          />
          <Divider sx={{ my: 2 }} />
          <AutoCompleteSelect
            handleAutoCompleteChange={(event, newValue) => {
              handleAutoCompleteChange(
                newValue,
                "nextQuestion",
                "nexQuestionAU"
              );
            }}
            value={nexQuestionAU}
            label="Next Question"
            options={options}
          />
        </>
      )}
    </>
  );
};

export default Step2;
