import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Transaction } from "../../entities/Transaction";
import { getCookieValue } from "../../hooks/useCookie";
import { getStoredValue, setStoreValue } from "../../hooks/useStorage";
import { formatDate } from "../../utils/Date";

const BASE_URL: string = "https://localhost:7085/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getStoredValue("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let logoutFunction: () => void;

export const setLogoutFunction = (func: () => void) => {
  logoutFunction = func;
};

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = getCookieValue("refreshToken");
    const token = getStoredValue("accessToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: {
            token: token,
            refreshTokenValue: refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as any;
        setStoreValue("accessToken", accessToken);
        //setStoredValue('refreshToken', newRefreshToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh failed, log out the user or take appropriate actions
        console.log("Refresh token failed, logging out...");
        if (logoutFunction) {
          logoutFunction();
        }
      }
    } else {
      // No refresh token available, log out or handle session expiration
      console.log("No refresh atoken available, logging out...");
      if (logoutFunction) {
        logoutFunction();
      }
    }
  }

  return result;
};

// Create the API without directly accessing AuthContext
export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "Transaction",
      transformResponse: (response: any) =>
        response.map((attributes: any) => ({
          transactionId: attributes.transactionId,
          category: attributes.category,
          purchaseDate: formatDate(attributes.purchaseDate),
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
    updateTransaction: builder.mutation<void, { id: any; body: any }>({
      query: ({ id, body }) => ({
        url: `Transaction/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    deleteTransaction: builder.mutation<void, { id: any }>({
      query: ({ id }) => ({
        url: `Transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
