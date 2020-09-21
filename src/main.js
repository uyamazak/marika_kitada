import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueKonva from 'vue-konva'

Vue.use(VueKonva)

new Vue({
  render: h => h(App),
}).$mount('#app')
