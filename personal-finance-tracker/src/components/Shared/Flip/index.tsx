import React from "react";
import {
  BackCard,
  CardContainer,
  FrontCard,
  GlowEffect,
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
      <GlowEffect />
      <FrontCard>{front}</FrontCard>
      <BackCard>{back}</BackCard>

      {/* <HiddenCard>
        <span>{details}</span>
      </HiddenCard> */}

      {<GradientOverlay />}
    </CardContainer>
  );
}
