import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from '../../../api/adminAPI.js'

export const fetchUserGroups = createAsyncThunk( 'admin/groups',
  async (_, thunkAPI) => {
    try { return adminAPI.groups.getAll() } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const addGroup = createAsyncThunk( 'admin/addGroup',
  async (params, thunkAPI) => {
    try { return adminAPI.groups.create(params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const updateGroup = createAsyncThunk( 'admin/updGroup/:id',
  async (params, thunkAPI) => {
    try { return adminAPI.groups.update(params.id, params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)

export const removeGroup = createAsyncThunk( 'admin/remGroup/:id',
  async (id, thunkAPI) => {
    try { return adminAPI.groups.remove(id) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }
  }
)