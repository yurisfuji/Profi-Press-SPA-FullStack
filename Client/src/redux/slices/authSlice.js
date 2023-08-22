import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { fetchRegister, fetchUserData, fetchAuthMe } from '../thunks/authThunks.js'

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase( fetchUserData.pending, (state) => {
      state.currentUser = null
      state.isAuthenticating = true
    })
    builder.addCase( fetchUserData.fulfilled, (state, action) => {
      state.currentUser = action.payload?.user
      state.isAuthenticating = false
      state.isAuthenticated = true
      state.error = null
    })
    builder.addCase( fetchUserData.rejected, (state, action) => {
      state.error = action.payload.message
      state.isAuthenticating = false
    }) 

    builder.addCase( fetchRegister.pending, (state) => {
      state.currentUser = null
      state.isAuthenticating = true
    })
    builder.addCase( fetchRegister.fulfilled, (state, action) => {
      state.currentUser = action.payload?.user
      state.isAuthenticating = false
      state.isAuthenticated = true
      state.error = null
    })
    builder.addCase( fetchRegister.rejected, (state, action) => {
      state.error = action.payload.message
      state.isAuthenticating = false
    }) 

    builder.addCase( fetchAuthMe.pending, (state) => {
      state.currentUser = null
      state.isAuthenticating = true
    })
    builder.addCase( fetchAuthMe.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticating = false
      state.isAuthenticated = true
      state.error = null
    })
    builder.addCase( fetchAuthMe.rejected, (state, action) => {
      state.error = action.payload.message
      state.isAuthenticating = false
    })                   
  },
})

// Action creators are generated for each case reducer function
export const { 
  logoutUser 
} = authSlice.actions

export const getCurrentUser = (state) => state.auth.currentUser
export const getIsAuthenticating = (state) => state.auth.isAuthenticating
export const getIsAuthenticated = (state) => state.auth.isAuthenticated
export const getAuthError = (state) => state.auth.error

export default authSlice.reducer