import styled from "styled-components";
export const CardContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
export const BaseCard = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 500ms ease-out;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  span {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
  }
`;
export const FrontCard = styled(BaseCard)`
  background-color: var(--background-dashboard);
  ${CardContainer}:hover & {
    transform: scale(0.95);
    opacity: 0;
  }

  &::after {
    content: "↻ Hover to Flip";
    position: absolute;
    bottom: 1px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;
export const BackCard = styled(BaseCard)`
  background: ${(props) => props.theme.colors.flipCardBack};
  opacity: 0;
  transform: scale(0.9);
  display: flex;
  flex-direction: column;
  ${CardContainer}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;
export const HiddenCard = styled(BaseCard)`
  background-color: #5df0ab;
  opacity: 0;
  transform: scale(0.75) translateY(1rem);
  transition: all 300ms ease-out;
  ${CardContainer}:active & {
    opacity: 1;
    transform: scale(1.05) translateY(0);
  }
`;
export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 500ms ease-out;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;
