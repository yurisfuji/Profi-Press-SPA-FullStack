import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers, updateUser, removeUser, addUser } from '../thunks/admin/usersThunks.js'
import { fetchUserGroups, updateGroup, removeGroup, addGroup } from '../thunks/admin/groupsThunks.js'

const initialState = {
  users: [],
  userGroups: [],
  isLoading: false,
  error: null,
}
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {  
    clearAdminError: (state, action) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase( fetchUsers.pending, (state) => {
    
      state.isLoading = true
    })
    builder.addCase( fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload?.users
      state.isLoading = false
      state.error = null
    })
    builder.addCase( fetchUsers.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
    })
    builder.addCase( updateUser.pending, (state) => {
      state.users = []
      state.isLoading = true
    })
    builder.addCase( updateUser.fulfilled, (state, action) => {
      state.users = action.payload?.users
      state.isLoading = false
      state.error = null
    })
    builder.addCase( updateUser.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
    })
    builder.addCase( removeUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase( removeUser.fulfilled, (state, action) => {
      state.users = action.payload?.users
      state.isLoading = false
      state.error = null
    })
    builder.addCase( removeUser.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
    })    
    builder.addCase( addUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase( addUser.fulfilled, (state, action) => {
      state.users = action.payload?.users
      state.isLoading = false
      state.error = null
      state.newUser = null
    })
    builder.addCase( addUser.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
      state.newUser = null      
    }) 
    builder.addCase( updateGroup.pending, (state) => {
      //state.userGroups = []
      state.isLoading = true
    })
    builder.addCase( updateGroup.fulfilled, (state, action) => {
      state.userGroups = action.payload?.groups
      state.isLoading = false
      state.error = null
    })
    builder.addCase( updateGroup.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
    })
    builder.addCase( removeGroup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase( removeGroup.fulfilled, (state, action) => {
      state.userGroups = action.payload?.groups
      state.isLoading = false
      state.error = null
    })
    builder.addCase( removeGroup.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
    })    
    builder.addCase( addGroup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase( addGroup.fulfilled, (state, action) => {
      state.userGroups = action.payload?.groups
      state.isLoading = false
      state.error = null
      state.newGroup = null
    })
    builder.addCase( addGroup.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
      state.isLoading = false
      state.newGroup = null      
    })  
    builder.addCase( fetchUserGroups.pending, (state) => {
      state.userGroups = []
    })
    builder.addCase( fetchUserGroups.fulfilled, (state, action) => {
      state.userGroups = action.payload.groups
      state.error = null
    })
    builder.addCase( fetchUserGroups.rejected, (state, action) => {
      state.error = action.payload?.message || action.error?.message || 'error'
    })          
  },
})

// Action creators are generated for each case reducer function
export const {
  clearAdminError
} = adminSlice.actions

export const getAdminError = (state) => state.admin.error
export const getUsers = (state) => state.admin.users
export const getUserGroups = (state) => state.admin.userGroups

export default adminSlice.reducer