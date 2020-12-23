import Vue from 'vue'
import { Row, Col, Avatar, Layout, Button, Input } from 'ant-design-vue';
import App from './App.vue'
import "@/less/main.less";

Vue.use(Col);
Vue.use(Row);
Vue.use(Avatar);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Input);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
