import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import Loading from "./Components/Loading";
import Routes from "./Routes";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={Routes} />
    </Suspense>
  );
}

export default App;
