import { gql } from "@apollo/client";

export const LIST_SURVEYS = /* GraphQL */ gql(`
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int = 1000
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        archived
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`);

export const LIST_SURVEY_ENTRIES = /* GraphQL */ gql(`
query ListSurveyEntriess(
  $filter: ModelSurveyEntriesFilterInput
  $limit: Int =  1000
  $nextToken: String
) {
  listSurveyEntriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      startTime
      finishTime
      questionnaireId
      deleted
      archived
      testing
      complete
      createdAt
      updatedAt
      responses(limit: 300000) {
        items {
          id
          res
          createdAt
          updatedAt
          qu {
            id
            qu
            type
            isSelf
            isDependent
            order
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      by {
        id
        name
        email
        deleted
        archived
        createdAt
        updatedAt
      }
      location {
        id
        location
        inchargeEmail
        deleted
        archived
        createdAt
        updatedAt
      }
    }
    nextToken
  }
}
`);

export const LIST_QUESTIONNARIES_NAME = /* GraphQL */ gql(`
  query ListQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
    }
  }
`);

export const LIST_QUESTIONNARIES = /* GraphQL */ gql(`
  query ListQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        introMsg
        deleted
        archived
        endMsg
        createdAt
        updatedAt
        survey {
          id
          name
        }
      }
      nextToken
    }
  }
`);

export const COUNT_SURVEYS = /* GraphQL */ gql(`
query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int = 1000
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
    }
  }
`);

export const COUNT_SURVEY_LOCATIONS = /* GraphQL */ gql(`
  query ListSurveyLocations(
    $filter: ModelSurveyLocationFilterInput
    $limit: Int =1000
    $nextToken: String
  ) {
    listSurveyLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`);
