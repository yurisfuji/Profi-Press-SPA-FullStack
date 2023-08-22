import { createAsyncThunk } from '@reduxjs/toolkit'
import proAPI from '../../api/proAPI.js'

export const fetchCalcRequests = createAsyncThunk( 'pro/calcrequests',
  async (params, thunkAPI) => {
    try { return proAPI.calcrequests.getCalcRequests(params) } 
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }}
)

/* export const checkCalcRequestCode = createAsyncThunk ( 'pro/calcrequests/check', 
  async (params, thunkAPI) => {
    try { return proAPI.calcrequests.checkCalcRequestCode(params) }  
    catch (error) { return thunkAPI.rejectWithValue(error.response.data) }}
) */

/*   export const getDeliveryCities = async (setCities) => {
    try {
      return await axios.get('pro/calcrequests/fieldvalues', {params: {field: 'deliveryCity'}}).then(res => {
        setCities(res.data.values)
      })
    } catch (error) {
      console.log(error)
    }
  }

  export const getManagers = async (setManagers) => {
    try {
      return await axios.get('pro/calcrequests/fieldvalues', {params: {field: 'manager'}}).then(res => {
        setManagers(res.data.values)
      })
    } catch (error) {
      console.log(error)
    }
  } */