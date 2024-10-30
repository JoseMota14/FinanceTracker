import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { darkTheme, lightTheme } from "./configs/themes";
import { GlobalStyles } from "./GlobalStyles";
import useAuth from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { setLogoutFunction } from "./store/transactions/TransactionsApi";
import router from "./utils/Router";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    setLogoutFunction(() => {
      logout();
    });
  }, [logout]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ToastContainer />
      <RouterProvider router={router(isLoggedIn)}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
