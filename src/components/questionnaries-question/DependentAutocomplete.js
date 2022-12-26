import AutoCompleteSelect from "../reusable/AutoComplete";

const DependentAutocomplete = ({
  handleAutoCompleteChange,
  dependentQuestionAU,
  dependentQuestionOptionsAU,
  options,
  dependentQuestionListOptions,
  handleSettingDependentNextQuestion,
}) => (
  <>
    <AutoCompleteSelect
      handleAutoCompleteChange={(event, newValue) => {
        handleAutoCompleteChange(
          newValue,
          "dependentQuestion",
          "dependentQuestionAU"
        );
      }}
      value={dependentQuestionAU}
      label="Dependent Question"
      options={options}
    />
    {dependentQuestionListOptions?.map((option, i) => (
      <AutoCompleteSelect
        handleAutoCompleteChange={(event, newValue) => {
          handleSettingDependentNextQuestion(newValue, option);
        }}
        value={
          dependentQuestionOptionsAU?.find((o) => o?.dependentValue === option)
            ?.nextQuestion
        }
        label={option}
        options={options}
        key={i}
        sx={{ my: 2 }}
      />
    ))}
  </>
);

export default DependentAutocomplete;
