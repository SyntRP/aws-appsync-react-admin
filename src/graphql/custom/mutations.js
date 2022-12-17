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
