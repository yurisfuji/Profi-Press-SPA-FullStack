import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   rapidSearch: false,
   groupTabs : [ 'admin', 'techno', 'econom', 'contra'],
   mode: window.localStorage.getItem('mui-mode') || document.documentElement.dataset.theme,  
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setMode: (state, action) => {
      console.log(action.payload)
      state.mode = action.payload
    },
    changeMode: (state, action) => {  
      state.mode = action.payload
    }
  },
})

export const isRapidSearch = state => state.options.rapidSearch
export const getMode = state => state.options.mode
export const getGroupTabs = state => state.options.groupTabs
// Action creators are generated for each case reducer function
export const { setMode, changeMode } = optionsSlice.actions

export default optionsSlice.reducer