import { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Shared/Card/CardNew";
import Flip from "../components/Shared/Flip";
import { AppDispatch, RootState, useGetTransactionsQuery } from "../store";
import { setTransactions } from "../store/transactions/TransactionsSlice";
import { notifyError } from "../utils/Notify";
import {
  calculateCategorySum,
  formatCurrency,
  getCategoryDetails,
} from "../utils/TransactionUtils/Calc";
import { CategorySchema } from "../entities/Transaction";
import { stat } from "fs";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "display_expenses":
      return { ...state, expenses: !state.expenses };
    case "display_income":
      return { ...state, income: !state.income };
    default:
      return state;
  }
}

export default function DashboardPage() {
  const dispatchs = useDispatch<AppDispatch>();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const [state, dispatch] = useReducer(reducer, {
    expenses: true,
    income: true,
  });
  useEffect(() => {
    console.log(state);
  }, [state]);

  const {
    data: fetchTransactions,
    isLoading,
    error,
    refetch,
  } = useGetTransactionsQuery();

  useEffect(() => {
    if (error) {
      notifyError("Error while fetching transactions");
    } else if (fetchTransactions) {
      dispatchs(setTransactions(fetchTransactions));
    }
  }, [fetchTransactions, error, dispatchs]);

  const categoryData = useMemo(() => {
    return CategorySchema.options.reduce((acc, category) => {
      const sum = calculateCategorySum(transactions, category.toLowerCase());
      const details = getCategoryDetails(transactions, category.toLowerCase());

      acc[category] = {
        sum,
        details,
        card: {
          front: <div>Expenses on {category}</div>,
          back: (
            <div>
              {formatCurrency(sum)}
              <ul>
                {details.map((item, index) => (
                  <li key={index}>
                    {item.date}: {item.value} - {item.description}
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      };

      return acc;
    }, {} as Record<string, { sum: number; details: any[]; card: any }>);
  }, [transactions]);

  return (
    <Cards>
      <Li>
        <Category
          onClick={() => dispatch({ type: "display_expenses" })}
          color={"red"}
        >
          Expenses
          {state.expenses ? (
            <FaArrowCircleUp size={16} style={{ paddingLeft: "0.5rem" }} />
          ) : (
            <FaArrowCircleDown size={16} style={{ paddingLeft: "0.5rem" }} />
          )}
        </Category>
        <List style={{ display: state.expenses ? "" : "none" }}>
          {["Food", "Clothes", "Transports", "Health", "General"].map(
            (category) => (
              <GridItem key={category}>
                <Flip
                  key={category}
                  front={categoryData[category].card.front}
                  back={categoryData[category].card.back}
                />
              </GridItem>
            )
          )}
        </List>
      </Li>
      <Li>
        <Category
          onClick={() => dispatch({ type: "display_income" })}
          color={"green"}
        >
          Incomes
          {state.income ? (
            <FaArrowCircleUp size={16} style={{ paddingLeft: "0.5rem" }} />
          ) : (
            <FaArrowCircleDown size={16} style={{ paddingLeft: "0.5rem" }} />
          )}
        </Category>
        <List style={{ display: state.income ? "" : "none" }}>
          <GridItem key={"Incomes"}>
            <Flip front={"front"} back={"back"} details={"details"} />
          </GridItem>
        </List>
      </Li>
    </Cards>
  );
}

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Allow natural content flow */
  gap: 1rem;
  padding: 3rem;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 1rem;
  min-height: 90vh; /* Use min-height instead of height */
  overflow-y: auto; /* Enable scrolling if content overflows */
  width: 98%;
`;

const Li = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--dashboard-item);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  width: 100%;
`;

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  /* Default - all items in complete rows get flex 1 (span 2 out of 6 columns) */
  & > * {
    grid-column: span 2;
  }

  /* When last row has 2 items, each gets flex 1.5 (span 3 out of 6 columns) */
  & > *:last-child:nth-child(3n-1),
  & > *:nth-last-child(2) {
    grid-column: span 3;
  }

  /* When there's only 1 item in the last row, it gets flex 3 (span all 6 columns) */
  & > *:last-child:nth-child(3n-2) {
    grid-column: span 6;
  }

  gap: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--dashboard-item);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);

    /* Reset spans for medium screens - 2 items per row */
    & > * {
      grid-column: span 2;
    }

    /* Last odd item spans full width */
    & > *:last-child:nth-child(2n + 1) {
      grid-column: span 4;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    /* All items span full width on mobile */
    & > * {
      grid-column: span 1;
    }
  }
`;
const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* Allows items to fill space */
  height: 150px; /* Ensure a fixed height */
`;

const Category = styled.span<{ color: string }>`
  cursor: pointer;
  height: auto;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 0.5rem;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color};
  border-radius: 5px;
`;
