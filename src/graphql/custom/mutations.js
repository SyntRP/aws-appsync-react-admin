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
export const UPDATE_SURVEY = /* GraphQL */ gql(`
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image 
      createdAt
      updatedAt
    }
  }
`);
