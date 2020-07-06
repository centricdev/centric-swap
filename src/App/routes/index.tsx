import React, { Suspense, lazy } from "react";
import { LoadingFrame } from "../components";

const Home = lazy(() => import("./Home/Home"));

function Routes() {
  return (
    <Suspense fallback={<LoadingFrame />}>
      <Home />
    </Suspense>
  );
}

export default Routes;
