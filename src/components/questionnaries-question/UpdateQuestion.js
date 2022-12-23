import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useForm from "../../helpers/hooks/useForm";
import Step1 from "./edit-steps/Step1";
import Step2 from "./edit-steps/Step2";
import Step3 from "./edit-steps/Step3";
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
} from "../../graphql/custom/mutations";
import {
  GET_QUESTION,
  GET_QUESTIONNAIRES,
  LIST_QUESTIONS,
} from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";

const STEPS = ["Edit Question", "Next Question", "Preview"];

const UpdateQuestion = ({ toggle, question }) => {
  const [updateQuestion, { loading, error }] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [{ query: LIST_QUESTIONS }],
  });

  // const { data: currentQuestion } = useQuery(GET_QUESTION, {
  //   variables: {
  //     id: question?.id,
  //   },
  // });

  const {
    values,
    handleInputChange,
    handleRadioButtonChange,
    handleAutoCompleteChange,
    setValues,
  } = useForm(question);

  const [activeStep, setActiveStep] = useState(0);
  const enableButton = () => {
    if (activeStep === 0)
      return (
        Boolean(values?.qu) &&
        Boolean(values?.order) &&
        Boolean(values?.currentMode) &&
        Boolean(values?.type)
      );
    if (activeStep === 1 || activeStep === 2) return true;
  };

  const handleNext = () => {
    if (
      activeStep === 0 &&
      values?.currentMode === "normal" &&
      (values?.type === "TEXT" || values?.type === "LIST")
    ) {
      setActiveStep(2);
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (
      activeStep === 2 &&
      values?.currentMode === "normal" &&
      (values?.type === "TEXT" || values?.type === "LIST")
    ) {
      setActiveStep(0);
    } else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSettingDependentNextQuestion = (que, optionValue) => {
    const isAlreadyExisting = values?.dependentQuestionOptions?.find(
      (option) => option?.dependentValue === optionValue
    );
    if (isAlreadyExisting) {
      const filteredDependentQuestionOptions =
        values?.dependentQuestionOptions?.filter(
          (option) => option?.dependentValue !== optionValue
        );
      const filteredDependentQuestionOptionsAU =
        values?.dependentQuestionOptionsAU?.filter(
          (option) => option?.dependentValue !== optionValue
        );
      setValues({
        ...values,
        dependentQuestionOptions: [
          ...filteredDependentQuestionOptions,
          { dependentValue: optionValue, nextQuestion: que?.id },
        ],
        dependentQuestionOptionsAU: [
          ...filteredDependentQuestionOptionsAU,
          { dependentValue: optionValue, nextQuestion: que },
        ],
      });
    } else {
      setValues({
        ...values,
        dependentQuestionOptions: [
          ...values?.dependentQuestionOptions,
          { dependentValue: optionValue, nextQuestion: que?.id },
        ],
        dependentQuestionOptionsAU: [
          ...values?.dependentQuestionOptionsAU,
          { dependentValue: optionValue, nextQuestion: que },
        ],
      });
    }
  };

  const getQuestionById = (id) => {
    const questions = question?.find((q) => q?.id === id);
    return questions?.qu ? questions?.order + "  " + questions?.qu : id;
  };

  const handleQuestionUpdate = async () => {
    const {
      qu,
      order,
      type,
      nextQuestion,
      dependentQuestion,
      currentMode,
      listItemOptions,
      listOptions,
      dependentQuestionOptions,
      id,
    } = values;
    console.log("values", values);
    let updateQuestionQuery = {
      qu: qu,
      type: type,
      order: order,
      id: id,
    };

    if (currentMode === "dependent") {
      const dependentQuestionQuery = {
        id: dependentQuestion,
        options: dependentQuestionOptions,
      };
      updateQuestionQuery.isDependent = true;
      updateQuestionQuery.dependent = dependentQuestionQuery;
      if (listItemOptions.length > 0)
        updateQuestionQuery.listOptions = listItemOptions;
    }

    if (currentMode === "self") {
      updateQuestionQuery.isSelf = true;
      if (type === "TEXT" || type === "LIST") {
        updateQuestionQuery.listOptions = {
          listValue: type,
          nextQuestion: nextQuestion,
        };
      }
    }
    if (type === "RADIO") {
      if (listItemOptions.length > 0)
        updateQuestionQuery.listOptions = listItemOptions;
    }
    if (type === "CHECKBOX") {
      if (listItemOptions.length > 0)
        updateQuestionQuery.listOptions = listItemOptions.map((option) => ({
          listValue: option?.listValue,
          nextQuestion,
        }));
    }
    await updateQuestion({ variables: { input: updateQuestionQuery } });
    toggle();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {STEPS.map((label, index) => (
          <Step key={index}>
            <StepLabel
              optional={
                index === 1 && (
                  <Tooltip title="Only Applicable for Self & Dependent mode">
                    {/* <Typography
                        sx={{ color: (theme) => theme.palette.warning.main }}
                        variant="body2"
                      >
                        Only Applicable for Self & Dependent mode
                      </Typography> */}
                    <InfoOutlinedIcon />
                  </Tooltip>
                )
              }
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Step1
          values={values}
          handleInputChange={handleInputChange}
          handleRadioButtonChange={handleRadioButtonChange}
        />
      )}

      {activeStep === 1 && (
        <Box my={1}>
          <Step2
            currentMode={values?.currentMode}
            handleAutoCompleteChange={handleAutoCompleteChange}
            type={values.type}
            questions={question}
            dependentQuestion={values?.dependentQuestion}
            handleSettingDependentNextQuestion={
              handleSettingDependentNextQuestion
            }
            dependentQuestionOptions={values?.dependentQuestionOptions}
            dependentQuestionOptionsAU={values?.dependentQuestionOptionsAU}
            dependentQuestionAU={values?.dependentQuestionAU}
            nexQuestionAU={values?.nexQuestionAU}
            listItemOptions={values?.listItemOptions}
            setValues={setValues}
            getQuestionById={getQuestionById}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Step3 values={values} getQuestionById={getQuestionById} />
      )}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        {activeStep === 0 ? (
          <Button onClick={toggle} variant="text" color="info">
            Close
          </Button>
        ) : (
          <>
            {!loading && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
          </>
        )}
        <Box sx={{ flex: "1 1 auto" }} />

        {activeStep === STEPS.length - 1 ? (
          <>
            {loading ? (
              <Button disabled variant="contained">
                UPDATING....
              </Button>
            ) : (
              <Button onClick={handleQuestionUpdate} variant="contained">
                UPDATE
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!enableButton()}
            variant="contained"
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default withSuspense(UpdateQuestion);
