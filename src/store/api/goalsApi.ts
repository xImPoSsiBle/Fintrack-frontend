import type { Goal, GoalFormState } from "../../types/goal";
import { baseApi } from "./baseApi";


export const goalsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllGoals: builder.query<Goal[], void>({
            query: () => '/goals',
            providesTags: ['Goals']
        }),
        createGoal: builder.mutation<void, GoalFormState>({
            query: (body) => ({
                url: '/goals',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Goals']
        }),
        addContribution: builder.mutation<void, { goalId: number; amount: number }>({
            query: ({ goalId, amount }) => ({
                url: `/goals/${goalId}/contributions`,
                method: 'POST',
                body: { amount },
            }),
            invalidatesTags: ['Goals'],
        }),
        getAvailable: builder.query<number, void>({
            query: () => 'goals/available',
            providesTags: ['Goals', 'Transaction'],
        }),
        deleteGoal: builder.mutation<void, number>({
            query: (id) => ({ url: `/goals/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Goals'],
        }),
    })
})

export const {
    useGetAllGoalsQuery,
    useCreateGoalMutation,
    useAddContributionMutation,
    useGetAvailableQuery,
    useDeleteGoalMutation
} = goalsApi