import { Authenticator, Image, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import AppSyncConfig from "./aws-exports";
import LOGO from "./assets/images/LOGO.svg";

Amplify.configure(AppSyncConfig);

const components = {
  Header() {
    return (
      <View textAlign="center" padding={2}>
        <Image alt="Memorial Planning logo" src={LOGO} />
      </View>
    );
  },
};
const AWSAuthenticator = ({ children }) => {
  return (
    <Authenticator hideSignUp={true} components={components}>
      {children}
    </Authenticator>
  );
};

export default AWSAuthenticator;
