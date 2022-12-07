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
      nextToken
    }
  }
`;
