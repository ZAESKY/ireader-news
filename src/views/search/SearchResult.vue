<template>
  <div class="SearchResult">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResults({
          page: this.page, // 页码
          per_page: this.per_page, // 每页传递的数据
          q: this.searchText // 搜索关键词
        })
        // 将数据添加到列表当中
        const { results } = data.data
        this.list.push(...results)
        // 将本次加载中的loading关闭
        this.loading = false
        // 判断是否还有更多数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取失败!')
      }
    }
  }
}
</script>

<style lang="less">
</style>