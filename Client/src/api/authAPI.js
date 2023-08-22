import axios from '../utils/axios.js'

const basePath = 'auth/'

const authAPI = {
        register: async (params) => await axios.post(basePath+'register', params).then(res => res.data),
        login: async (params) => await axios.post(basePath+'login', params).then(res => res.data),
        getMe: async () => await axios.get(basePath+'me').then(res => res.data),
}
export default authAPI