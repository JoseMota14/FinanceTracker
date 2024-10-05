import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.h3`
  font-size: 18px;
  color: #333;
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
