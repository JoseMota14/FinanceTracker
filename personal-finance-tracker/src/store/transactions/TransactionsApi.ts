import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../../entities/Transaction";
import { notifyError, notifySuccess } from "../../utils/Notify";

const url: string = "https://localhost:7085/api/";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "Transaction",
      transformResponse: (response: any) =>
        response.map((attributes: any) => ({
          transactionId: attributes.transactionId,
        })),
      providesTags: (result) =>
        result
          ? result.map(({ transactionId }) => ({
              type: "Transaction",
              id: transactionId,
            }))
          : [{ type: "Transaction" }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
          notifyError("Failed to fetch transactions");
        }
      },
    }),
    transactionUsers: builder.mutation<void, { body: any; headers: any }>({
      query: ({ body, headers }) => ({
        url: "transation",
        method: "POST",
        body,
        headers,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          notifySuccess(`transactions updated successfully`);
        } catch (error) {
          console.error("Transaction failed:", error);
          notifyError("Failed to update transactions");
        }
      },
      invalidatesTags: (result, error, arg) => {
        if (!arg.body || !Array.isArray(arg.body)) {
          return [{ type: "Transaction" }];
        }

        const tags = arg.body
          .filter((transaction: Transaction) => !!transaction.transactionId)
          .map((transaction: Transaction) => ({
            type: "Transaction" as const,
            id: transaction.transactionId,
          }));

        if (tags.length === 0) {
          return [{ type: "Transaction" }];
        }

        return tags;
      },
    }),
  }),
});

export const { useGetTransactionsQuery, useTransactionUsersMutation } =
  transactionsApi;
