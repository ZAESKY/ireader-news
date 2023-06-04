<template>
  <van-icon
    :class="{ cllected: value}"
    :name="value ? 'star' : 'star-o'"
    :color="value ? '' : '#777'"
    @click="onCllection"
    :loading="loading"
  />
</template>

<script>
import { addCllection, deleteCllection } from '@/api/article'
export default {
  name: 'CllectionCpn',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 收藏文章函数
    async onCllection () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCllection(this.articleId)
        } else {
          await addCllection(this.articleId)
        }
        // 发送到父组件的input事件
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功！' : '取消收藏！')
      } catch (error) {
        this.$toast('操作失败！请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.cllected{
  color: goldenrod;
}
</style>