import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from '../../../api/adminAPI.js'

export const fetchUsers = createAsyncThunk(
  'admin/users',
  async (_, thunkAPI) => {
    try { return adminAPI.users.getAll() } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const addUser = createAsyncThunk(
  'admin/adduser',
  async (params, thunkAPI) => {
    try { return adminAPI.users.create(params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const updateUser = createAsyncThunk(
  'admin/upduser/:id',
  async (params, thunkAPI) => {
    try { return adminAPI.users.update(params.id, params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const removeUser = createAsyncThunk(
  'admin/remuser/:id',
  async (id, thunkAPI) => {
    try { return adminAPI.users.remove(id) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)
