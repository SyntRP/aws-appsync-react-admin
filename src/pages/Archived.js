import React from "react";
import Archived from "../components/archived";
import withSuspense from "../helpers/hoc/withSuspense";

const ArchivedPage = () => {
  return <Archived />;
};

export default withSuspense(ArchivedPage);
