import Vue from 'vue'
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
import VueRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})