import type { AuthData, User, UserData } from "../../types/user";
import { baseApi } from "./baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserData, AuthData>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: [{ type: 'Auth' }]
        }),
        register: builder.mutation<User, AuthData>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        me: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: [{ type: 'Auth' }]
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useMeQuery, useLogoutMutation } = authApi