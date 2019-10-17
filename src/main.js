// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'   //引入路由对象
import request from './ajax.js'   //引入ajax对象
import ElementUI from 'element-ui'    //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'    //引入element-ui的css样式
import VideoPlayer from 'vue-video-player'  //视频插件


Vue.config.productionTip = false
Vue.prototype.$http = request   //将request对象赋值给vue原型对象的一个属性
Vue.use(ElementUI)    //在vue项目中使用element-ui
Vue.use(VideoPlayer); //使用视频插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
