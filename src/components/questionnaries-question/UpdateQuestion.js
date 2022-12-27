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
import { UPDATE_QUESTION } from "../../graphql/custom/mutations";
import { GET_QUESTIONNAIRES } from "../../graphql/custom/queries";
import withSuspense from "../../helpers/hoc/withSuspense";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { questionQuery } from "../../utils/Question";

const STEPS = ["Edit Question", "Next Question", "Preview"];

const UpdateQuestion = ({
  toggle,
  currentQuestion,
  questions,
  questionQuestionnaireId,
}) => {
  const [updateQuestion, { loading, error }] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONNAIRES,
        variables: {
          id: questionQuestionnaireId,
        },
      },
    ],
  });

  const { qu, order, type, isDependent, isSelf, listOptions, id, dependent } =
    currentQuestion;

  const currentMode = () => {
    if (isDependent) return "dependent";
    if (isSelf) return "self";
    return "normal";
  };

  const listItemOptions =
    listOptions?.length > 0
      ? listOptions?.map((item) => ({
          listValue: item?.listValue,
          nextQuestion: item?.nextQuestion,
        }))
      : [];

  const nextQuestion =
    listOptions?.length > 0 ? listOptions[0]?.nextQuestion : "";

  const questionAU = (question) => {
    if (question) {
      const que = questions?.find((q) => q?.id === question);
      return {
        id: que?.id,
        label: que?.order + "  " + que?.qu,
      };
    } else return {};
  };

  const dependentQuestionId = isDependent ? dependent?.id : "";

  const dependentQuestionOptions = isDependent
    ? dependent?.options?.map((item) => {
        const { dependentValue, nextQuestion } = item;
        return {
          dependentValue,
          nextQuestion,
        };
      })
    : [];

  const dependentQuestionOptionsAU = isDependent
    ? dependent?.options?.map((item) => {
        const { dependentValue, nextQuestion } = item;
        return {
          dependentValue,
          nextQuestion: questionAU(nextQuestion),
        };
      })
    : [];

  const initialFormValues = {
    question: qu,
    order,
    type,
    currentMode: currentMode(),
    nextQuestion,
    nexQuestionAU: questionAU(nextQuestion),
    listItemOptions,
    dependentQuestion: dependentQuestionId,
    dependentQuestionAU: questionAU(dependentQuestionId),
    dependentQuestionOptions,
    dependentQuestionOptionsAU,
  };

  const {
    values,
    handleInputChange,
    handleRadioButtonChange,
    handleAutoCompleteChange,
    setValues,
  } = useForm(initialFormValues);

  const [activeStep, setActiveStep] = useState(0);

  const enableButton = () => {
    if (activeStep === 0)
      return (
        Boolean(values?.question) &&
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
    const question = questions?.find((q) => q?.id === id);
    return question?.qu ? question?.order + "  " + question?.qu : id;
  };

  const handleQuestionUpdate = async () => {
    const updateQuestionQuery = questionQuery(values);
    updateQuestionQuery.id = id;
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
            type={values?.type}
            questions={questions}
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
