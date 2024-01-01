import { createApp } from 'vue'

import App from './App.vue'
import router from '@router/index'
import stores from '@stores'
import axiosInstance from '@axios'

import '@assets/css/tailwind.css'

const app = createApp(App)

app.config.globalProperties.$http = axiosInstance
app.use(stores)
app.use(router)

app.mount('#app')
