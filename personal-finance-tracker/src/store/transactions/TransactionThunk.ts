import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "../../entities/Transaction";
import { getData } from "../../utils/Fetch";
import { notifyError, notifySuccess } from "../../utils/Notify";

export const fetchTransactions = createAsyncThunk<Transaction[], void>(
  "users/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await getData("transactions");
      const transactions: Transaction[] = response.data.map(
        (transaction: any) => ({})
      );

      notifySuccess("Fetch transactions with success");

      return transactions;
    } catch (err) {
      notifyError("Error while fetching transactions");

      return thunkAPI.rejectWithValue([]);
    }
  }
);
