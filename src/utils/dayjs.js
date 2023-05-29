// 加载组件
import Vue from 'vue'
import dayjs from 'dayjs'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对处理时间
dayjs.extend(relativeTime)

// 设置为中文
dayjs.locale('zh-cn')

// 定义一个全局过滤器来替换时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})