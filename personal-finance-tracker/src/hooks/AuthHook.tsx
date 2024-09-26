import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthHook() {
  const context = useContext(AuthContext);

  return context;
}
