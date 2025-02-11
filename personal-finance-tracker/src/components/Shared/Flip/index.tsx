import React from "react";
import { BackCard, CardContainer, FrontCard, GradientOverlay } from "./styles";

interface FlipProps {
  front?: React.ReactNode;
  back?: React.ReactNode;
  details?: React.ReactNode;
}

export default function Flip({ front, back, details }: FlipProps) {
  return (
    <CardContainer>
      <FrontCard>{front}</FrontCard>
      <BackCard>{back}</BackCard>

      {<GradientOverlay />}
    </CardContainer>
  );
}
