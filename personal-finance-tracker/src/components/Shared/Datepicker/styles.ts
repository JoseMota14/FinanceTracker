import styled from "styled-components";

export const PickerContainer = styled.div`
  padding: 10px;
  position: relative;
`;

export const SectionCenter = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;

  &:last-child {
    margin-top: 10px;
  }
`;

export const DropdownButton = styled.div`
  border: 1px solid var(--button-border);
  border-radius: 10px;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  cursor: pointer;
  color: var(--text-color);
  box-shadow: 0 1px 5px 0 var(--border-box);
  padding: 5px 20px;
  z-index: 1; /* Ensure buttons are properly stacked */
  position: relative; /* Maintain stacking context */
`;

export const DropdownContainer = styled.div`
  position: absolute;
  background-color: var(--backfround-color-foreground);
  top: 45px;
  left: 0;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--button-border);
  border-radius: 10px;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
  z-index: 2; /* Higher than the button to appear above */
`;

export const DropdownOption = styled.div`
  padding: 10px 15px;
  background-color: var(--backfround-color-foreground);
  cursor: pointer;
  transition: all 200ms linear;
  border-radius: 10px;
  &:hover {
    background-color: var(--background-color);
    color: var(--text-color);
  }
`;
