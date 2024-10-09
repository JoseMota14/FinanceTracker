import styled from "styled-components";
import Card from "../components/Shared/Card";
export default function DashboardPage() {
  return (
    <>
      <Cards>
        <List>
          <Item>
            <Card title="Food Expenses" />
          </Item>

          <Item>
            <Card title="Food Expenses" type="income" />
          </Item>
        </List>
        <List>
          <Item>
            <Card title="Food Expenses" />
          </Item>
        </List>
      </Cards>
    </>
  );
}

const Cards = styled.div`
  background-color: #edf2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  height: 80vh;
`;

const Item = styled.ul`
  border-radius: 5px;
  padding: 0px;
  &:hover {
    transform: scale(1.1);
  }
`;

const List = styled.li`
  list-style: none;
  @media (min-width: 1024px) {
    display: flex;
  }
`;
