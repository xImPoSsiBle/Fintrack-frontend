import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'

interface AuthState {
  isAuth: boolean
  csrfToken: string | null
}

const initialState: AuthState = {
  isAuth: false,
  csrfToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setCsrfToken(state, action: PayloadAction<string>) {
      state.csrfToken = action.payload
    },
    clearCsrfToken(state) {
      state.csrfToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.me.matchRejected,
        (state) => {
          state.isAuth = false
          state.csrfToken = null
        }
      )
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.isAuth = false
          state.csrfToken = null
        }
      )
      .addMatcher(
        authApi.endpoints.me.matchFulfilled,
        (state, action) => {
          state.isAuth = true
          state.csrfToken = action.payload.csrf_token
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.isAuth = true
          state.csrfToken = action.payload.csrf_token
        })
  }
})

export const { setIsAuth, setCsrfToken, clearCsrfToken } = authSlice.actions
export default authSlice.reducer
