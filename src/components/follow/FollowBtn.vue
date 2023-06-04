<template>
<!-- 关注按钮 -->
<van-button
    v-if="is_Followed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addUserFollow, deleteUserFollow } from '@/api/user'
export default {
  name: 'FollowBtn',
  props: {
    followStatus: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false, // 按钮点击状态
      is_Followed: this.followStatus
    }
  },
  methods: {
    // 关注用户
    async onFollow () {
      // 按钮点击加载状态
      this.followLoading = true
      try {
        // 判断是否已经关注过了，执行相应的方法
        if (this.followStatus) {
          await deleteUserFollow(this.userId)
        } else {
          await addUserFollow(this.userId)
        }
        this.$emit('upadateFollow', !this.followStatus)
        this.is_Followed = !this.is_Followed
      } catch (error) {
        let message = '操作失败请重试！'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      // 点击后结束加载状态
      this.followLoading = false
    }
  }
}
</script>

<style lang="less">
</style>