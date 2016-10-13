import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import App from './App'
// css imports
import './lib/bootstrap/css/bootstrap.min.css'
import './css/jquery.ui.css'
import './css/admin.css'
import './css/font.css'
import './css/screen.css'
import './css/jqtransform.css'
// end css imports
import './js/script'
import './js/jquery.jqtransform'
/* eslint-disable no-new */
const router = new VueRouter();
router.map({
  '/hello': {
    component: Hello
  }
});

// Any invalid route will redirect to home
router.redirect({
  '*': '/hello'
});

router.start(App, '#app');
// new Vue({
//   el: '#app',
//   render: h => h(App)
// });
