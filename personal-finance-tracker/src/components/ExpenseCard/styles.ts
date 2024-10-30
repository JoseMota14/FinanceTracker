import styled from "styled-components";

export const Description = styled.h3`
  font-size: 18px;
  color: var(--text-color);
`;

export const Amount = styled.p<{ type: "income" | "expense" }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.type === "income" ? "#28a745" : "#dc3545")};
`;

export const Date = styled.p`
  font-size: 14px;
  color: #888;
`;

export const Type = styled.p<{ type: "income" | "expense" }>`
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  color: ${(props) => (props.type === "income" ? "#28a745" : "#dc3545")};
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Card = styled.div`
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  width: 100%;
  max-width: 80%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
