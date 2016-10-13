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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
