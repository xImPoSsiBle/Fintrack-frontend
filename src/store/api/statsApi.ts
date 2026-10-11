import type { ByCategory, MonthlyStat, SummaryStat } from "../../types/stats";
import { baseApi } from "./baseApi";


export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryStat, void>({
            query: () => "/stats/summary",
            providesTags: ["Stat"]
        }),
        getMonthly: builder.query<MonthlyStat[], void>({
            query: () => "/stats/monthly",
            providesTags: ["Stat"]
        }),
        getByCategory: builder.query<ByCategory[], string>({
            query: (type) => `/stats/by-category?type=${type}`,
            providesTags: ["Stat"]
        })
    })
})

export const {useGetSummaryQuery, useGetMonthlyQuery, useGetByCategoryQuery} = statsApi