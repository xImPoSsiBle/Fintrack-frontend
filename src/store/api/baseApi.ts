import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants/api'
import type { RootState } from '../store'


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const csrfToken = (getState() as RootState).auth?.csrfToken
      if (csrfToken) {
        headers.set('X-CSRF-Token', csrfToken)
      }
      return headers
    },
  }),
  tagTypes: ['Category', 'Transaction', 'Auth', 'Stat'],
  endpoints: () => ({}),
})
