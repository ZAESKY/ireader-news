<template>
  <van-icon
    :class="{liked: value === 1}"
    :color="value === 1 ? '' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLiked"
    :loading = "loading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeCpn',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onLiked () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功！' : '取消点赞')
      } catch (error) {
        this.$toast('操作失败,，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked{
  color: goldenrod;
}
</style>