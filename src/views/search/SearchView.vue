<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#1989fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult :search-text="searchText" v-if="isResultShow" />
    <SearchSuggestion :search-text="searchText" @search="onSearch" v-else-if="searchText" />
    <SearchHistory :searchHistorys="searchHistorys" v-else />
  </div>
</template>

<script>
import SearchHistory from './SearchHistory.vue'
import SearchSuggestion from './SearchSuggestion.vue'
import SearchResult from './SearchResult.vue'
export default {
  name: 'searchView',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistorys: []
    }
  },
  methods: {
    onSearch (val) {
      this.searchHistorys.push(val)
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.search{
  .van-search__action{
    color: #fff;
  }
}
</style>