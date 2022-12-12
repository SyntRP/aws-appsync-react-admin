import Users from "../components/users";
import withSuspense from "../helpers/hoc/withSuspense";

const UsersPage = () => {
  return <Users />;
};

export default withSuspense(UsersPage);
