import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Paginate from 'vuejs-paginate'

createApp(App).use(router).use(Paginate).use(store).mount('#app')
