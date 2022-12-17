import { gql } from "@apollo/client";
export const CREATE_SURVEY_USER = /* GraphQL */ gql(`
  mutation CreateSurveyUser(
    $input: CreateSurveyUserInput!
    $condition: ModelSurveyUserConditionInput
  ) {
    createSurveyUser(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_SURVEY_USER = /* GraphQL */ gql(`
  mutation UpdateSurveyUser(
    $input: UpdateSurveyUserInput!
    $condition: ModelSurveyUserConditionInput
  ) {
    updateSurveyUser(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_SURVEY_LOCATION = /* GraphQL */ gql(`
  mutation CreateSurveyLocation(
    $input: CreateSurveyLocationInput!
    $condition: ModelSurveyLocationConditionInput
  ) {
    createSurveyLocation(input: $input, condition: $condition) {
      id
      location
      inchargeEmail
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_SURVEY_LOCATION = /* GraphQL */ gql(`
  mutation UpdateSurveyLocation(
    $input: UpdateSurveyLocationInput!
    $condition: ModelSurveyLocationConditionInput
  ) {
    updateSurveyLocation(input: $input, condition: $condition) {
      id
      location
      inchargeEmail
      createdAt
      updatedAt
    }
  }
`);
export const CREATE_SURVEY = /* GraphQL */ gql(`
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      groups
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_QUESTIONNAIRE = /* GraphQL */ gql(`
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      introMsg
      deleted
      archived
      endMsg
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_QUESTIONNAIRE = /* GraphQL */ gql(`
  mutation UpdateQuestionnaire(
    $input: UpdateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    updateQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      introMsg
      deleted
      archived
      endMsg
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_QUESTONNAIRE = /* GraphQL */ gql(`
  mutation DeleteQuestionnaire(
    $input: DeleteQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    deleteQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      image
      type
      introMsg
      deleted
      archived
      endMsg
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_SURVEY = /* GraphQL */ gql(`

mutation UpdateSurvey(
  $input: UpdateSurveyInput!
  $condition: ModelSurveyConditionInput
){
  updateSurvey(input: $input, condition: $condition) {
    id
    name
    description
    image
    archived
    deleted
    groups
    createdAt
    updatedAt
    preQuestionnaire {
      id
      name
    }
  }
}
`);
