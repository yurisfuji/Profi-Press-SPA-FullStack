import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:1976",
    headers: {
        'Authorization': window.localStorage.getItem('token'),
        'access-control-allow-origin': '*'
    }
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if (error.response && error.response.data) {
      const data = error.response.data;
      return Promise.reject(data.message + (data.errors ? ('  ['+data.errors?.map(e=>e.message).join('\n')+']') : ''))
    }
    return Promise.reject(error.message);
  });

export default instance