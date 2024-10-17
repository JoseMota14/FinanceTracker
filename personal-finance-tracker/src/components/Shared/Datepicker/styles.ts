import styled from "styled-components";

export const PickerContainer = styled.div`
  padding: 10px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledSelect = styled.select`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 1s ease;
  font-weight: bold;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px #3498db;
  }
`;

export const StyledSelectYear = styled.select`
  flex: 1;
  padding: 4px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 1s ease;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px #3498db;
  }
`;
