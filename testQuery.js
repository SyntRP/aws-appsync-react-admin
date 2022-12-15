/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers($UserPoolId: String) {
    listUsers(UserPoolId: $UserPoolId)
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups($UserPoolId: String) {
    listGroups(UserPoolId: $UserPoolId)
  }
`;
export const listGroupMembers = /* GraphQL */ `
  query ListGroupMembers($UserPoolId: String, $GroupName: String) {
    listGroupMembers(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
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
        }
        question {
          nextToken
        }
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
        }
        question {
          nextToken
        }
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
        }
        question {
          nextToken
        }
      }
      questionnaire {
        items {
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
        nextToken
      }
    }
  }
`;
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getQuestionnaire = /* GraphQL */ `
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
`;
export const listQuestionnaires = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
        options {
          dependentValue
          nextQuestion
        }
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
        }
        question {
          nextToken
        }
      }
    }
  }
`;
export const listQuestions = /* GraphQL */ `
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
`;
export const getResponses = /* GraphQL */ `
  query GetResponses($id: ID!) {
    getResponses(id: $id) {
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
        responses {
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
    }
  }
`;
export const listResponsess = /* GraphQL */ `
  query ListResponsess(
    $filter: ModelResponsesFilterInput
    $limit: Int
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
`;
export const getSurveyEntries = /* GraphQL */ `
  query GetSurveyEntries($id: ID!) {
    getSurveyEntries(id: $id) {
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
      responses {
        items {
          id
          res
          deleted
          archived
          createdAt
          updatedAt
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
  }
`;
export const listSurveyEntriess = /* GraphQL */ `
  query ListSurveyEntriess(
    $filter: ModelSurveyEntriesFilterInput
    $limit: Int
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
`;
export const getSurveyUser = /* GraphQL */ `
  query GetSurveyUser($id: ID!) {
    getSurveyUser(id: $id) {
      id
      name
      email
      deleted
      archived
      createdAt
      updatedAt
    }
  }
`;
export const listSurveyUsers = /* GraphQL */ `
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
        deleted
        archived
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSurveyLocation = /* GraphQL */ `
  query GetSurveyLocation($id: ID!) {
    getSurveyLocation(id: $id) {
      id
      location
      inchargeEmail
      deleted
      archived
      createdAt
      updatedAt
    }
  }
`;
export const listSurveyLocations = /* GraphQL */ `
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
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($UserPoolId: String, $Username: String) {
    deleteUser(UserPoolId: $UserPoolId, Username: $Username)
  }
`;
export const addUserToGroup = /* GraphQL */ `
  mutation AddUserToGroup(
    $UserPoolId: String
    $Username: String
    $GroupName: String
  ) {
    addUserToGroup(
      UserPoolId: $UserPoolId
      Username: $Username
      GroupName: $GroupName
    )
  }
`;
export const addGroup = /* GraphQL */ `
  mutation AddGroup($UserPoolId: String, $GroupName: String) {
    addGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($UserPoolId: String, $GroupName: String) {
    deleteGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      archived
      groups
      createdAt
      updatedAt
      preQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      mainQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      postQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      archived
      groups
      createdAt
      updatedAt
      preQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      mainQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      postQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      archived
      groups
      createdAt
      updatedAt
      preQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      mainQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
      postQuestionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const createQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      createdAt
      updatedAt
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateQuestionnaire = /* GraphQL */ `
  mutation UpdateQuestionnaire(
    $input: UpdateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    updateQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      createdAt
      updatedAt
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteQuestionnaire = /* GraphQL */ `
  mutation DeleteQuestionnaire(
    $input: DeleteQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    deleteQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      createdAt
      updatedAt
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
      questionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
      questionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
      questionnaire {
        id
        name
        description
        type
        createdAt
        updatedAt
        question {
          nextToken
        }
      }
    }
  }
`;
export const createResponses = /* GraphQL */ `
  mutation CreateResponses(
    $input: CreateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    createResponses(input: $input, condition: $condition) {
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
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
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
          type
          createdAt
          updatedAt
        }
      }
      group {
        id
        by
        createdAt
        updatedAt
        responses {
          nextToken
        }
      }
    }
  }
`;
export const updateResponses = /* GraphQL */ `
  mutation UpdateResponses(
    $input: UpdateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    updateResponses(input: $input, condition: $condition) {
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
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
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
          type
          createdAt
          updatedAt
        }
      }
      group {
        id
        by
        createdAt
        updatedAt
        responses {
          nextToken
        }
      }
    }
  }
`;
export const deleteResponses = /* GraphQL */ `
  mutation DeleteResponses(
    $input: DeleteResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    deleteResponses(input: $input, condition: $condition) {
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
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
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
          type
          createdAt
          updatedAt
        }
      }
      group {
        id
        by
        createdAt
        updatedAt
        responses {
          nextToken
        }
      }
    }
  }
`;
export const createSurveyEntries = /* GraphQL */ `
  mutation CreateSurveyEntries(
    $input: CreateSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    createSurveyEntries(input: $input, condition: $condition) {
      id
      by
      createdAt
      updatedAt
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateSurveyEntries = /* GraphQL */ `
  mutation UpdateSurveyEntries(
    $input: UpdateSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    updateSurveyEntries(input: $input, condition: $condition) {
      id
      by
      createdAt
      updatedAt
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteSurveyEntries = /* GraphQL */ `
  mutation DeleteSurveyEntries(
    $input: DeleteSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    deleteSurveyEntries(input: $input, condition: $condition) {
      id
      by
      createdAt
      updatedAt
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createSurveyUser = /* GraphQL */ `
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
`;
export const updateSurveyUser = /* GraphQL */ `
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
`;
export const deleteSurveyUser = /* GraphQL */ `
  mutation DeleteSurveyUser(
    $input: DeleteSurveyUserInput!
    $condition: ModelSurveyUserConditionInput
  ) {
    deleteSurveyUser(input: $input, condition: $condition) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
