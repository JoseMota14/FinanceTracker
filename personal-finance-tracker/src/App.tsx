import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { darkTheme, lightTheme } from "./configs/themes";
import useAuth from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import router from "./utils/Router";

function App() {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <ToastContainer />
      <RouterProvider router={router(isLoggedIn)}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
