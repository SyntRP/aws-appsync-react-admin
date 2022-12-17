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
export const LISTQUESTIONS = /* GraphQL */ gql(`
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int = 30000
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        qu
        type
        isSelf
        isDependent
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
        deleted
        archived
        order
        dependent {
          id
        }
        createdAt
        updatedAt
        questionnaire {
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
      nextToken
    }
  }
`);
export const LIST_RESPONSESS = /* GraphQL */ gql(`
  query ListResponsess(
    $filter: ModelResponsesFilterInput
    $limit: Int =10000000
    $nextToken: String
  ) {
    listResponsess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        res
        deleted
        archived
        createdAt
        updatedAt
        qu {
          id
          qu
          type
          isSelf
          isDependent
          deleted
          archived
          order
          createdAt
          updatedAt
        }
        group {
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
        }
      }
      nextToken
    }
  }
`);

export const GET_QUESTIONNAIRES = /* GraphQL */ gql(`
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
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
      survey {
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
        mainQuestionnaire {
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
        postQuestionnaire {
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
        questionnaire {
          nextToken
        }
      }
      question(limit: 200) {
        items {
          id
          qu
          type
          isSelf
          isDependent
          listOptions {
            listValue
            nextQuestion
            isText
            isMultiple
          }
          dependent {
            id
            options {
              dependentValue
              nextQuestion
            }
          }
          order
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`);
