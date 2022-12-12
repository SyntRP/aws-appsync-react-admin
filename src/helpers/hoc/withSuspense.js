import { Component, Suspense } from "react";
import { Loader } from "../../components/common/Loader";

const withSuspense = (OriginalComponent) => {
  class newComponent extends Component {
    render() {
      return (
        <Suspense fallback={<Loader />}>
          <OriginalComponent {...this.props} />
        </Suspense>
      );
    }
  }
  return newComponent;
};

export default withSuspense;
