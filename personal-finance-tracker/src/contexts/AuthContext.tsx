import { createContext, useState } from "react";
import { useCookie } from "../hooks/useCookie";
import { useStorage } from "../hooks/useStorage";

export interface iAuthContext {
  isLoggedIn: boolean;
  changeUser: (email: string) => void;
  changeRefreshToken: (token: string) => void;
  changeAuthToken: (token: string) => void;
  changeIsLoggedIn: (value: boolean) => void;
}

export interface iAuthProvider {
  children: any;
}

const AuthContext = createContext({} as iAuthContext);

function AuthProvider({ children }: iAuthProvider) {
  const [user, setUser, removeUserLocal] = useCookie("email", {} as string, {
    path: "/",
    secure: true,
    sameSite: "Strict",
    httpOnly: true,
  });

  const [token, setRefreshToken, removeToken] = useCookie("refreshToken", "", {
    path: "/",
    secure: true,
    sameSite: "Strict",
    httpOnly: true,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  function changeUser(email: string) {
    setUser(email);
  }
  function changeRefreshToken(email: string) {
    setRefreshToken(email);
  }

  function changeIsLoggedIn(value: boolean) {
    setIsLoggedIn(value);
  }

  const [authToken, setAuthToken] = useStorage("authToken", {} as string);

  function changeAuthToken(token: string) {
    setAuthToken(token);
  }

  function Logout() {
    removeUserLocal();
    removeToken();
    setAuthToken("0");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        changeUser,
        changeRefreshToken,
        changeAuthToken,
        changeIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
