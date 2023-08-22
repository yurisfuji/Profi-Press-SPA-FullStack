import { createSlice } from '@reduxjs/toolkit'
import { fetchCalcRequests } from '../thunks/proThunks.js'

const initialState = {
   calcRequestSearchText: null,
   calcRequestSearchPeriod: null,
   totalRequestsCount: 0,
   calcRequests: [],
   proLoading: false,
   proError: null,
   pageNumber: 0,
   pageSize: 50
}

export const proSlice = createSlice({
  name: 'pro',
  initialState,
  reducers: {
    setcalcRequestSearchText: (state, action) => {
      state.calcRequestSearchText =  action.payload
      state.pageNumber = 0
    },    
    setCalcRequestSearchPeriod: (state, action) => {
      state.calcRequestSearchPeriod = action.payload.period
      state.calcRequestSearchText = null
      state.pageNumber = 0
    },
    nextPage: (state, action) => {
      state.pageNumber += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase( fetchCalcRequests.pending, (state) => {
      if(state.pageNumber === 0)
        state.calcRequests = []
      state.totalRequestsCount = 0
      state.proLoading = true
      state.proError = null
    })
    builder.addCase( fetchCalcRequests.fulfilled, (state, action) => {
      state.calcRequests = state.calcRequests.concat(action.payload?.requests)
      state.totalRequestsCount = action.payload?.count
      state.proLoading = false
      state.proError = null
    })
    builder.addCase( fetchCalcRequests.rejected, (state, action) => {
      state.proError = action.payload?.message || 
                       action.payload.match(/<pre>(.*?)<\/pre>/g).map( val => val.replace(/<\/?pre>/g,''))
      state.proLoading = false
    }) 
  }  
})


// Action creators are generated for each case reducer function
export const { 
  setCalcRequestSearchPeriod, 
  setcalcRequestSearchText, 
  nextPage 
} = proSlice.actions


export default proSlice.reducer