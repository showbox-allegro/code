import Vue from 'vue';
import store from "./config/store";
import { Upload, Select, Divider, Checkbox, Empty, Dropdown, Badge, Menu, Modal, Spin, Alert, Icon, Row, Col, Avatar, Layout, Button, Input } from 'ant-design-vue';
import App from './App.vue'
import "@/less/main.less";

Vue.use(Upload);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(Empty);
Vue.use(Dropdown);
Vue.use(Badge);
Vue.use(Menu);
Vue.use(Modal);
Vue.use(Spin);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(Avatar);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Input);

Vue.config.productionTip = false

new Vue({
  render: h => h(App), 
  store
}).$mount('#app')
