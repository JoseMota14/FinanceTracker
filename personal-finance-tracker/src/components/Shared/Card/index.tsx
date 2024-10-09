import { useState } from "react";

import {
  CardContainer,
  CardContent,
  CardHeader,
  ItemPercentage,
  ItemText,
  ListItem,
  Title,
  ToggleIcon,
} from "./styles";

interface CardProps {
  title?: string;
  type?: string;
}

export default function Card({
  title,
  type,
  children,
}: CardProps & { children?: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <CardContainer>
      <CardHeader onClick={toggleCollapse}>
        <Title>{title}</Title>
        <ToggleIcon>{isExpanded ? "−" : "+"}</ToggleIcon>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <ListItem key={1}>
            <ItemText>{"a"}</ItemText>
            <ItemPercentage>{10}%</ItemPercentage>
          </ListItem>
        </CardContent>
      )}
    </CardContainer>
  );
}
