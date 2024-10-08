import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../../entities/Transaction";
import { getStoredValue } from "../../hooks/useStorage";
import { formatDate } from "../../utils/Date";

const BASE_URL: string = "https://localhost:7085/api/";

// Create the API without directly accessing AuthContext
export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getStoredValue("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "Transaction",
      transformResponse: (response: any) =>
        response.map((attributes: any) => ({
          transactionId: attributes.transactionId,
          category: attributes.category,
          purchaceDate: formatDate(attributes.purchaseDate),
          value: attributes.value,
          type: attributes.type,
          description: attributes.description,
        })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ transactionId }) => ({
                type: "Transaction" as const,
                id: transactionId,
              })),
              { type: "Transaction", id: "LIST" },
            ]
          : [{ type: "Transaction", id: "LIST" }],
    }),
    addTransaction: builder.mutation<void, { body: any }>({
      query: ({ body }) => ({
        url: "Transaction",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionsApi;
