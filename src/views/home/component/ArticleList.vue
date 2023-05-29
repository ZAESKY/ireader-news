<template>
  <van-pull-refresh v-model="isReDreshLoading" :success-text="successText" @refresh="onRefresh">
  <div class="ArticleList">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="(article,index) in list" :key="index" :article="article"/>
      <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
    </van-list>
  </div>
</van-pull-refresh>
</template>

<script>
import { getrecArticles } from '@/api/article'
import ArticleItem from '@/components/article/ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 存储获取到的数据
      loading: false, // 设置加载状态
      finished: false, // 设置加载完成的状态
      timestamp: null, // 时间戳
      error: false, // 错误提示
      isReDreshLoading: false, // 下拉刷新提示
      successText: '' // 刷新提示语
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 获取填充文章列表数据
    async onLoad () {
      try {
        // 请求获取数据
        const { data } = await getrecArticles({
          // 获取内容的频道ID
          channel_id: this.channel.id,
          // 页码：以时间戳方式获取
          timestamp: this.timestamp || Date.now() // 如果有没有时间戳则以当前时间戳请求数据，如果有则以数据传递的时间戳请求数据
        })
        // 将获取到的数据结构出需要的数据放到list中
        const { results } = data.data
        this.list.push(...results)
        // 将加载状态设置为结束
        this.loading = false
        // 判断是否全部加载完成
        if (results.length) {
          // 如果还未加载完成，传递前一个时间戳获取下一页内容
          this.timestamp = data.data.pre_timestamp
        } else {
          // 全部加载完成设置为true
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取失败！')
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getrecArticles({
          // 获取内容的频道ID
          channel_id: this.channel.id,
          // 页码：以时间戳方式获取
          timestamp: Date.now() // 下拉刷新都以最新的时间戳请求数据
        })
        const { results } = data.data
        this.list.unshift(...results)

        // 关闭下拉刷新的加载状态
        this.isReDreshLoading = false
        // 修改下拉刷新成功提示语
        this.successText = `刷新成功 加载${results.length}条数据`
      } catch (error) {
        this.successText = '刷新失败'
        this.isReDreshLoading = false
      }
    }
  }
}
</script>

<style lang="less">
.ArticleList{
  height: 79vh;
  overflow-y: auto;
}
</style>