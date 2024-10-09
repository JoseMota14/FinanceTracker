import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 15px;
  background: rgb(198, 208, 255);
  background: linear-gradient(
    90deg,
    rgba(198, 208, 255, 1) 0%,
    rgba(255, 225, 231, 1) 100%
  );
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const Title = styled.h3<{ type?: string }>`
  color: ${({ type }) => (type === "income" ? "#38a169" : "#e53e3e")};
  font-size: 18px;
  font-weight: 500;
`;

export const ToggleIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #3e5361;
`;

export const ItemText = styled.p`
  font-size: 16px;
  color: #ecf0f1;
  margin: 0;
`;

export const ItemPercentage = styled.p`
  font-size: 16px;
  color: #ecf0f1;
  margin: 0;
`;
