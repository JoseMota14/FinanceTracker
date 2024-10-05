import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Transaction } from "../../entities/Transaction";

interface TasksState {
  selectedTransaction: Transaction["transactionId"];
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TasksState = {
  selectedTransaction: {} as string,
  transactions: [],
  isError: false,
  isLoading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTransaction: (
      state,
      action: PayloadAction<Transaction["transactionId"]>
    ) => {
      state.selectedTransaction = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { selectTransaction, setTransactions } = tasksSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.transactions.isLoading;
export const obtainTasks = (state: RootState) =>
  state.transactions.transactions;
export const obtainSelectedTask = (state: RootState) =>
  state.transactions.selectedTransaction;

export default tasksSlice.reducer;
