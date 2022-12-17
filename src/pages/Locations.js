import { lazy, Suspense } from "react";
import { Loader } from "../components/common/Loader";
import Locations from "../components/locations";
import CreateButton from "../components/reusable/CreateButton";
import DynamicModel from "../components/reusable/DynamicModel";
import withSuspense from "../helpers/hoc/withSuspense";
import useToggle from "../helpers/hooks/useToggle";

const CreateLocation = lazy(() =>
  import("../components/locations/CreateLocation")
);

const LocationsPage = () => {
  const { open, toggleOpen } = useToggle();
  return (
    <>
      <DynamicModel
        dialogTitle="Create Location"
        open={open}
        toggle={toggleOpen}
        isClose
        maxWidth="sm"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <CreateLocation toggle={toggleOpen} />
        </Suspense>
      </DynamicModel>
      <Locations />
      <CreateButton onClick={toggleOpen} />
    </>
  );
};

export default withSuspense(LocationsPage);
