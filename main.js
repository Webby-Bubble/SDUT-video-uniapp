import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入uView
import uView from "uview-ui";
Vue.use(uView);

//引入lottie动态特效
import lottie from "lottie-web";
Vue.prototype.$lottie = lottie;

Vue.prototype.userPath = 'http://localhost:9999/rst-user'
Vue.prototype.videoPath = 'http://localhost:9999/rst-video'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif