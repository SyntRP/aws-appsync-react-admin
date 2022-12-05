import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import AppSyncConfig from "./aws-exports";

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_project_region;
const auth = {
  type: AppSyncConfig.aws_appsync_authenticationType,
  apiKey: AppSyncConfig.aws_appsync_apiKey,
};
const link = ApolloLink.from([
  // @ts-ignore
  createAuthLink({ url, region, auth }),
  // @ts-ignore
  createHttpLink({ uri: url }),
]);
// const httpLink = new HttpLink({ uri: url });

// const link = ApolloLink.from([
//   createAuthLink({ url, region, auth }),
//   createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
// ]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
