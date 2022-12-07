import { Authenticator, Heading, Text, useTheme } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import AppSyncConfig from "./aws-exports";

Amplify.configure(AppSyncConfig);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const AWSAuthenticator = ({ children }) => {
  return (
    <Authenticator
      //   formFields={formFields}
      //   components={components}
      hideSignUp={true}
    >
      {children}
    </Authenticator>
  );
};

export default AWSAuthenticator;
