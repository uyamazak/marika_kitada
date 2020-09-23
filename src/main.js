import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false
import VueKonva from 'vue-konva'
import vuetify from './plugins/vuetify';

Vue.use(VueKonva)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
