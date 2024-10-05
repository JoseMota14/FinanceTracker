import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DashboardPage from "../pages/DashboardPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import TransactionPage from "../pages/TransactionPage";

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
          path: "/transactions",
          element: <TransactionPage />,
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
