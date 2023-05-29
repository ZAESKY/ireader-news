<template>
  <div class="SearchHistory">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete-o" />
    </van-cell>
    <van-cell v-for="(item,index) in searchHistorys" :key="index" :title="item">
      <van-icon name="cross" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less">
</style>