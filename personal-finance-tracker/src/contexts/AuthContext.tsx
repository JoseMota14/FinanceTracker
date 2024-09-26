import { createContext, useState } from "react";

export interface iAuthContext {
  isLoggedIn: boolean;
}

export interface iAuthProvider {
  children: any;
}

const AuthContext = createContext({} as iAuthContext);

function AuthProvider({ children }: iAuthProvider) {
  const [isLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
