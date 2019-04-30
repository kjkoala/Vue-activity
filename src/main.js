import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('uppercase',value => {
  if(!value) return '';
  
  return value.toUpperCase();
})

Vue.filter('prettyTime',timeStamp => {
  if(!timeStamp) return '';
  
  return moment(timeStamp).format('LLL');
})

new Vue({
  render: h => h(App),
}).$mount('#app')
