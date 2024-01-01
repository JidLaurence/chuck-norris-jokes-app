import config from '@config'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: config.API_URL
})

const authInterceptor = (auth: any) => {
  auth.headers.Authorization = config.ACCESS_TOKEN_SECRET
  return auth
}

axiosInstance.interceptors.request.use(authInterceptor)

export default axiosInstance
