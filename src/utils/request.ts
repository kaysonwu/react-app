import axios from 'axios'

const request = axios.create()

request.interceptors.request.use(value => {
  return value
});

request.interceptors.response.use(response => {
  return response.data
}, error => {
  
})

export default request
