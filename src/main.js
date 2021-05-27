import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

// new一个vue实例做事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
