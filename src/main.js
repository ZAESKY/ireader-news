import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组件
import Vant from 'vant'
// 加载vant样式
import 'vant/lib/index.css'
// 导入移动端适配 动态设置rem基准值
import 'amfe-flexible'
// 导入自定义的css
import '@/styles/index.less'
// 导入时间处理
import '@/utils/dayjs'
// 注册组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
