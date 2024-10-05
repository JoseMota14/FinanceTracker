import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { Container } from "./styles";

export default function Switcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Container onClick={toggleTheme}>
      {theme === "light" ? <FaMoon color="black"></FaMoon> : <FaSun></FaSun>}{" "}
    </Container>
  );
}
