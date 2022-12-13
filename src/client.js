import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { Auth } from "aws-amplify";
import { createAuthLink } from "aws-appsync-auth-link";
import AppSyncConfig from "./aws-exports";

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_project_region;
// const auth = {
//   type: AppSyncConfig.aws_appsync_authenticationType,
//   apiKey: AppSyncConfig.aws_appsync_apiKey,
// };
const auth = {
  type: "AMAZON_COGNITO_USER_POOLS",
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
};
const link = ApolloLink.from([
  // @ts-ignore
  createAuthLink({ url, region, auth }),
  // @ts-ignore
  createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listSurveyEntriess: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            // merge(existing = [], incoming) {
            //   const items = incoming?.items;
            //   console.log("incoming : ", incoming);
            //   return [...existing, ...items];
            // },
          },
        },
      },
    },
  }),
});

export default client;
