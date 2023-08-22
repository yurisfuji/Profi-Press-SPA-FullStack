import { createSlice } from '@reduxjs/toolkit'

export const modalIds = {
  logout: 'LOGOUT',
  user: 'USER',
  userGroup: 'USERGROUP',
  calcRequest: 'CALCREQUEST'
}

const initialState = {
   openModalId: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    selectModalToOpen: (state, action) => {
      state.openModalId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { selectModalToOpen } = modalSlice.actions

export const openModal = {
  logout: selectModalToOpen(modalIds.logout),
  user: selectModalToOpen(modalIds.user),
  userGroup: selectModalToOpen(modalIds.userGroup),
  calcRequest: selectModalToOpen(modalIds.calcRequest),
  close: selectModalToOpen(null),
}

export default modalSlice.reducer