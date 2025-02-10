import styled from "styled-components";

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 400ms ease-in-out;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.15),
    transparent
  );
`;

export const CardContainer = styled.div`
  position: relative;
  width: 280px;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.05) rotateY(5deg); /* Subtle tilt */
  }

  &:hover ${GradientOverlay} {
    opacity: 1;
  }
`;

export const GlowEffect = styled.div`
  position: absolute;
  inset: -5px;
  border-radius: 1rem;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 400ms ease-in-out;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

export const BaseCard = styled.div`
  position: absolute;
  inset: 0;
  padding: 1rem; /* Adjusted padding */
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 400ms ease-in-out, opacity 350ms ease-in-out;
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.1);
`;

export const FrontCard = styled(BaseCard)`
  background-color: var(--background-dashboard);
  position: relative;

  /* Hint text/icon for hover */
  &::after {
    content: "↻ Hover to Flip";
    position: absolute;
    bottom: 1px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    transition: opacity 300ms ease-in-out;
  }

  ${CardContainer}:hover &::after {
    opacity: 0;
  }

  ${CardContainer}:hover & {
    transform: rotateY(180deg) scale(0.9);
    opacity: 0;
  }
`;

export const BackCard = styled(BaseCard)`
  background: ${(props) => props.theme.colors.flipCardBack};
  opacity: 0;
  transform: rotateY(-180deg) scale(0.9);
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 500ms ease-in-out, opacity 400ms ease-in-out;

  ${CardContainer}:hover & {
    opacity: 1;
    transform: rotateY(0deg) scale(1);
  }
`;

export const HiddenCard = styled(BaseCard)`
  background: linear-gradient(135deg, #5df0ab 10%, #3db57b 90%);
  opacity: 0;
  transform: scale(0.75) translateY(0.75rem);
  transition: transform 250ms ease-out, opacity 350ms ease-in-out;

  ${CardContainer}:active & {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;
