import type { Period } from "../../types/period";
import type { ByCategory, MonthlyStat, SummaryStat } from "../../types/stats";
import { baseApi } from "./baseApi";


export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryStat, Period>({
            query: (period) => ({
                url: "/stats/summary",
                params: {period}
            }),
            providesTags: ["Stat"]
        }),
        getMonthly: builder.query<MonthlyStat[], Period>({
            query: (period) => ({
                url: "/stats/monthly",
                params: {period}
            }),
            providesTags: ["Stat"]
        }),
        getByCategory: builder.query<ByCategory[], { type: string, period: Period }>({
            query: ({ type, period }) => ({
                url: `/stats/by-category`,
                params: { type, period }
            }),
            providesTags: ["Stat"]
        })
    })
})

export const { useGetSummaryQuery, useGetMonthlyQuery, useGetByCategoryQuery } = statsApi