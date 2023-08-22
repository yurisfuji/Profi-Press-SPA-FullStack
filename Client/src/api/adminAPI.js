import axios from '../utils/axios.js'

const basePath = 'admin/'

const paths = {
    users: basePath+'users/',
    groups: basePath+'groups/'
}

const adminAPI = {
    users: {
        getAll: async () => await axios.get(paths.users).then(res => res.data),
        create: async (params) => await axios.post(paths.users, params).then(res => res.data),
        update: async (id, params) => await axios.patch(paths.users+id, params).then(res => res.data),
        remove: async (id) => await axios.delete(paths.users+id).then(res => res.data),
    },
    groups: {
        getAll: async () => await axios.get(paths.groups).then(res => res.data),
        create: async (params) => await axios.post(paths.groups, params).then(res => res.data),
        update: async (id, params) => await axios.patch(paths.groups+id, params).then(res => res.data),
        remove: async (id) => await axios.delete(paths.groups+id).then(res => res.data),
    },
} 

export default adminAPI