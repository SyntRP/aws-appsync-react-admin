import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
import AppSyncConfig from "./aws-exports";
Amplify.configure(AppSyncConfig);

const signOut = () => {
  Auth.signOut({ global: true })
    .then((data) => {
      alert("Signout");
    })
    .catch((err) => {
      console.log(err);
    });
};

const App = () => {
  return <div>Apple</div>;
};

export default withAuthenticator(App);
