import styled from "styled-components";

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 1rem;
`;

export const ToggleButton = styled.button<{ isDark: boolean }>`
  position: relative;
  width: 80px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--button-border);
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  outline: none;
  padding: 0;
  background-color: var(--background-color);
`;

export const Icon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  transition: opacity 0.3s ease;
`;

export const SunIcon = styled(Icon)<{ isDark: boolean }>`
  left: 8px;
  opacity: ${({ isDark }) => (isDark ? 0 : 1)};
`;

export const MoonIcon = styled(Icon)<{ isDark: boolean }>`
  right: 8px;
  opacity: ${({ isDark }) => (isDark ? 1 : 0)};
`;

export const Knob = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: grab;
  transition: transform 0.3s ease;
  transform: translateX(${({ isDark }) => (isDark ? "40px" : "0")});

  &:active {
    cursor: grabbing;
  }
`;
