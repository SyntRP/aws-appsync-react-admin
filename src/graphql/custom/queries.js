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
  $filter: ModelSurveyEntriesFilterInput = {
    # or:[
    #   {
    #     complete:{eq:100}
    #   },
    #   {
    #     complete:{attributeExists:false}
    #   }
    # ],
    testing:{ne:true},

  }
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
      by {
        id
        name
        email
      }
      location {
        id
        location
        inchargeEmail
       
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

export const LIST_SURVEY_USERS = /* GraphQL */ gql(`
  query ListSurveyUsers(
    $filter: ModelSurveyUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveyUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`);

export const LIST_SURVEY_LOCATIONS = /* GraphQL */ gql(`
  query ListSurveyLocations(
    $filter: ModelSurveyLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveyLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        location
        inchargeEmail
        deleted
        archived
        createdAt
        updatedAt
      }
      nextToken
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
