import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DashboardPage from "../pages/DashboardPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import TaskPage from "../pages/TaskPage";

const router = (isLoggedIn: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <LoginPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "/tasks",
          element: <TaskPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
};

export default router;
