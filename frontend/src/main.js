// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import { Lazyload } from 'vant'
import { Locale } from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import enUS from 'vant/es/locale/lang/en-US'
import axios from 'axios'
import "@/assets/iconfont/iconfont.css"

Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Locale.use('en-US', enUS);

Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
