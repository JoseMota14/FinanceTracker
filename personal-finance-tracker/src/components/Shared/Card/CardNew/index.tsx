import getIcon from "../../Icons";
import { StyledCard, Title } from "./styles";

interface CardProps {
  title?: string;
  category: string;
  size: "lg" | "sm";
  variant: "grey";
}

export default function Card({
  title,
  category,
  size,
  variant,
  children,
}: CardProps & { children?: React.ReactNode }) {
  return (
    <StyledCard size={size} variant={variant}>
      <Title>{title}</Title>
      {getIcon(category)}
    </StyledCard>
  );
}
