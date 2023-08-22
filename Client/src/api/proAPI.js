import axios from '../utils/axios.js'

const basePath = 'pro/'

const paths = {
    calcrequests: basePath+'calcrequests/',
}

const adminAPI = {
    calcrequests: {
        getCalcRequests: async (params) => {
           return await axios.get(paths.calcrequests, {params}).then(res => res.data)
        },
        checkCalcRequestCode: async (params) => {
           return await axios.get(paths.calcrequests+'check', {params}).then(res => res.data)
        },       
    },
} 

export default adminAPI