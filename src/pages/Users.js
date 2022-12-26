import { lazy, Suspense } from "react";
import { Loader } from "../components/common/Loader";
import CreateButton from "../components/reusable/CreateButton";
import DynamicModel from "../components/reusable/DynamicModel";
import Users from "../components/users";
import withSuspense from "../helpers/hoc/withSuspense";
import useToggle from "../helpers/hooks/useToggle";

const CreateUser = lazy(() => import("../components/users/CreateUser"));

const UsersPage = () => {
  const { open, toggleOpen } = useToggle();
  return (
    <>
      <DynamicModel
        dialogTitle="Create User"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="sm"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <CreateUser toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>
      <CreateButton onClick={toggleOpen} />
      <Users />
    </>
  );
};

export default withSuspense(UsersPage);
