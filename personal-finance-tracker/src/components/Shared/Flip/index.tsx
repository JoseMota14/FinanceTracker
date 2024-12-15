import React from "react";
import {
  BackCard,
  CardContainer,
  FrontCard,
  GradientOverlay,
  HiddenCard,
} from "./styles";

interface FlipProps {
  front?: React.ReactNode;
  back?: React.ReactNode;
  details?: React.ReactNode;
}

export default function Flip({ front, back, details }: FlipProps) {
  return (
    <CardContainer>
      <FrontCard>
        <span>{front}</span>
      </FrontCard>

      <BackCard>
        <span>{back}</span>
      </BackCard>

      <HiddenCard>
        <span>{details}</span>
      </HiddenCard>

      {<GradientOverlay />}
    </CardContainer>
  );
}
