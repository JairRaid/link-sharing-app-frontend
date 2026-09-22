import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { Toaster } from "react-hot-toast";
import { useNetworkStatus } from "./utils/useNetworkStatus";

const App = () => {
  useNetworkStatus();

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
