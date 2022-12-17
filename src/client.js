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
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
