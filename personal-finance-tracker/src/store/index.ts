import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { transactionsApi } from "./transactions/TransactionsApi";
import TransactionSlice from "./transactions/TransactionsSlice";

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    transactions: TransactionSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(transactionsApi.middleware);
  },
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from "./transactions/TransactionsApi";
