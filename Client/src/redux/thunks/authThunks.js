import { createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../../api/authAPI.js'

export const fetchRegister = createAsyncThunk( 'auth/register',
  async (params, thunkAPI) => {
    try { return authAPI.register(params) } 
     catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const fetchUserData = createAsyncThunk( 'auth/login',
  async (params, thunkAPI) => {
    try { return authAPI.login(params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const fetchAuthMe = createAsyncThunk( 'auth/me',
  async (_, thunkAPI) => {
    try { return authAPI.getMe() }
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)


