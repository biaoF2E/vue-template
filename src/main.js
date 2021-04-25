import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/lib/element'

/** http api */
import http from '@/http'
Vue.use(http);

/** global filter */
import '@/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
