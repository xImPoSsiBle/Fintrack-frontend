import { baseApi } from './baseApi'
import type { Transaction, TransactionCreate } from '../../types/transaction'
import type { Period } from '../../types/period';

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], { search?: string; period: Period }>({
      query: ({ search, period }) => ({
        url: '/transactions',
        params: { search: search || undefined, period }
      }),
      providesTags: (result) =>
        result
          ? [...result.map((t) => ({ type: 'Transaction' as const, id: t.transaction.id })), { type: 'Transaction', id: 'LIST' }]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),

    createTransaction: builder.mutation<Transaction, TransactionCreate>({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }, 'Stat'],
    }),
    deleteTransaction: builder.mutation<Transaction, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }, 'Stat']
    })
  }),
})

export const { useGetTransactionsQuery, useCreateTransactionMutation, useDeleteTransactionMutation } = transactionsApi
