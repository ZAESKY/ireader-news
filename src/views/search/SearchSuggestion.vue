<template>
  <div class="SearchSuggestion">
    <div v-if="suggestions.length>1">
    <van-cell v-for="(text,index) in suggestions" :key="index" icon="search" @click="$emit('search', text)">
      <span  slot="title" v-html="highlight(text)"></span>
    </van-cell>
  </div>
    <van-cell v-else title="未搜索到结果"></van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // 监听父组件传递的输入内容
    searchText: {
      // handler (value) {
      //   console.log(value)
      // },
      // 优化防抖之后的处理函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 500),
      // 开启立即监听,要不然首次发生改变检测不到
      immediate: true
    }
  },
  methods: {
    // 加载搜索建议内容
    async loadSearchSuggestions (value) {
      try {
        const { data } = await getSearchSuggestions(value)
        this.suggestions = data.data.options
        console.log(this.suggestions)
      } catch (error) {
        this.$toast('获取失败!')
      }
    },
    // 搜索结果高亮处理
    highlight (text) {
      if (text) {
        // 定义想要的高亮样式
        const highlightStr = `<span class='active'>${this.searchText}</span>`
        // 正则表达式
        const reg = new RegExp(this.searchText, 'gi')
        // 将搜索到的结果替换成高亮样式
        return text.replace(reg, highlightStr)
      }
    }
  }
}
</script>

<style scoped lang="less">
.SearchSuggestion{
 /deep/ .active{
    color: #1989fa;
  }
}
</style>