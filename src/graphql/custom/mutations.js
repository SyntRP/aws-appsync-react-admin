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
