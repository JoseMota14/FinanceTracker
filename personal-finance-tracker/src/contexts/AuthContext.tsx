import { createContext, useCallback, useEffect, useState } from "react";
import { useCookie } from "../hooks/useCookie";
import { useStorage } from "../hooks/useStorage";

export interface iAuthContext {
  isLoggedIn: boolean;
  email: string | null;
  accessToken: string;
  changeEmail: (email: string) => void;
  changeRefreshToken: (token: string) => void;
  changeAccessToken: (token: string) => void;
  changeIsLoggedIn: (value: boolean) => void;
  logout: () => void;
  successLogin: (
    email: string,
    refreshToken: string,
    accessToken: string
  ) => void;
  refreshAccessToken: () => Promise<string>;
}

export interface iAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext({} as iAuthContext);

function AuthProvider({ children }: iAuthProvider) {
  const [refreshToken, setRefreshToken, removeRefreshToken] = useCookie(
    "refreshToken",
    "",
    {
      path: "/",
      secure: true,
      sameSite: "Strict",
      httpOnly: true,
    }
  );

  const [email, setEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [accessToken, setAccessToken] = useStorage("accessToken", "");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail && refreshToken) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, [refreshToken]);

  const changeEmail = useCallback((newEmail: string) => {
    setEmail(newEmail);
    sessionStorage.setItem("userEmail", newEmail);
  }, []);

  const changeRefreshToken = useCallback(
    (token: string) => {
      setRefreshToken(token);
    },
    [setRefreshToken]
  );

  const changeAccessToken = useCallback(
    (token: string) => {
      setAccessToken(token);
    },
    [setAccessToken]
  );

  const changeIsLoggedIn = useCallback((value: boolean) => {
    setIsLoggedIn(value);
  }, []);

  const logout = useCallback(() => {
    removeRefreshToken();
    setAccessToken("");
    sessionStorage.removeItem("userEmail");
    setEmail(null);
    setIsLoggedIn(false);
  }, [removeRefreshToken, setAccessToken]);

  const successLogin = useCallback(
    (email: string, refreshToken: string, accessToken: string) => {
      setEmail(email);
      setRefreshToken(refreshToken);
      setAccessToken(accessToken);
      setIsLoggedIn(true);
      sessionStorage.setItem("userEmail", email);
    },
    [setEmail, setRefreshToken, setAccessToken, setIsLoggedIn]
  );

  const refreshAccessToken = useCallback(async (): Promise<string> => {
    try {
      // Replace this URL with your actual refresh token endpoint
      const response = await fetch("https://your-api.com/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;

      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      throw error;
    }
  }, [refreshToken, setAccessToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        accessToken,
        changeEmail,
        changeRefreshToken,
        changeAccessToken,
        changeIsLoggedIn,
        logout,
        refreshAccessToken,
        successLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
