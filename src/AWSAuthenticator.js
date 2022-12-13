import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import AppSyncConfig from "./aws-exports";

Amplify.configure(AppSyncConfig);

const AWSAuthenticator = ({ children }) => {
  return <Authenticator hideSignUp={true}>{children}</Authenticator>;
};

export default AWSAuthenticator;
