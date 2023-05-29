<template>
  <div class="layout">
    <!-- 子路由 -->
    <router-view />
    <!-- 导航栏 -->
  <van-tabbar v-model="active">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/qa" icon="comment-o" >问答</van-tabbar-item>
    <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
    <van-tabbar-item to="/my" icon="user-circle-o">{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      active: 0
    }
  }
}
</script>
