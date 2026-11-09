import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { API_URL } from '../../constants/api'
import type { RootState } from '../store'

const mutex = new Mutex()

const NO_REAUTH = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const csrfToken = (getState() as RootState).auth?.csrfToken
    if (csrfToken) {
      headers.set('X-CSRF-Token', csrfToken)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await rawBaseQuery(args, api, extraOptions)

    const url = typeof args === 'string' ? args : args.url
    if (result.error?.status === 401 && !NO_REAUTH.includes(url)) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refresh = await rawBaseQuery(
            { url: '/auth/refresh', method: 'POST' }, api, extraOptions,
          )
          if (refresh.data) {
            const { csrf_token } = refresh.data as { csrf_token: string }
            api.dispatch({ type: 'auth/setCsrfToken', payload: csrf_token })
            result = await rawBaseQuery(args, api, extraOptions)
          } else {
            const wasAuth = (api.getState() as RootState).auth?.isAuth
            api.dispatch({ type: 'auth/setIsAuth', payload: false })
            api.dispatch({ type: 'auth/clearCsrfToken' })
            if (wasAuth) {
              api.dispatch(baseApi.util.resetApiState())
            }
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await rawBaseQuery(args, api, extraOptions)
      }
    }
    return result
  }

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Category', 'Transaction', 'Auth', 'Stat', 'Goals'],
  endpoints: () => ({}),
})