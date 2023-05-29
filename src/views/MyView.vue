<template>
  <div class="myView">
    <div v-if="user" class="user-info">
      <div class="base-data">
        <div class="left">
        <van-image
          round
          fit="cover"
          class="user-avatar"
          :src="userInfo.photo"
        />
        <span class="user-name">{{userInfo.name}}</span>
      </div>
      <div class="right">
        <van-button type="default" size="mini" round>编辑资料</van-button>
      </div>
      </div>
      <div class="user-data">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="count-text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="count-text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="count-text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="count-text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="my-header">
    <div @click="$router.push('/login')">
      <div class="login-btn">
        <van-icon name="manager" />
      </div>
      <div class="login-text">
        登录 / 注册
      </div>
    </div>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link style="margin-top: 10px;" />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" value="退出登录" @click="logOut" class="user-quit" clickable/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myView',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    logOut () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
        this.$toast({
          message: '已取消',
          position: 'bottom'
        })
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        console.log('获取失败！')
      }
    }
  }
}
</script>

<style lang="less">
.my-header{
  height: 361px;
  background-color: #1989fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-btn{
    width: 132px;
    height: 132px;
    text-align: center;
    line-height: 132px;
    background-color: white;
    border-radius: 50%;
    color: #1989fa;
  }
  .login-text{
    font-size: 28px;
    color: white;
    margin-top: 20px;
  }
}
.user-info{
  background-color: #1989fa;
  .base-data{
  height: 231px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  .left{
    display: flex;
    align-items: center;
    .user-name{
      margin-left: 20px;
      font-size: 30px;
      color: #fff;
    }
  }
  .user-avatar{
    width: 132px;
    height: 132px;
    border: 3px solid #fff;
  }
}
.user-data{
  display: flex;
  color: #fff;
  .data-item{
    height: 130px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .count{
      font-size: 36px;
    }
    .count-text{
      font-size: 26px;
    }
  }
}
}
.user-quit{
  margin-top: 20px;
  .van-cell__value--alone{
    color: #ff0000;
    text-align: center;
  }
}
</style>