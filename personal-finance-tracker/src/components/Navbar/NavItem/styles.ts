import styled from "styled-components";
import { Button } from "../../Shared/Button";

export const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: auto;
  text-align: left;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 1rem 0rem 1rem 1rem;
  transition: all 0.3s;
  background-color: 1px solid var(--background-color);
  /* background-color: ${({ isActive }) =>
    isActive ? "rgba(14, 165, 233, 0.1)" : "transparent"}; */

  &:hover {
    color: ${({ isActive }) => (isActive ? "#3b82f6" : "#475569")};
    background-color: ${({ isActive }) =>
      isActive ? "rgba(14, 165, 233, 0.1)" : "rgba(148, 163, 184, 0.2)"};
  }
`;

export const IconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ isActive }) =>
    isActive ? `var(--text-active)` : `var(--text-inactive)`};
  @media (max-width: 768px) {
    a {
      display: none;
    }
  }
`;

export const ActiveIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  margin-left: 1rem;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  border: 2px solid #3b82f6;
  height: 100%;
  padding-top: 1rem;
  transition: opacity 0.3s;
`;
