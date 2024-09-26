import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthHook from "./hooks/AuthHook";
import router from "./utils/Router";

function App() {
  const { isLoggedIn } = AuthHook();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router(isLoggedIn)}></RouterProvider>
    </>
  );
}

export default App;
