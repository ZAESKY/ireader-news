<template>
  <div class="home">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-input" slot="title" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- 标签栏 -->
    <van-tabs class="tab-nav" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in UserChannelList" :key="channel.id">
        <ArticleList :channel="channel"/>
      </van-tab>
      <div slot="nav-right" class="nav-placeholder"></div>
      <div slot="nav-right" class="nav-menu" @click="isChannelShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup v-model="isChannelShow"
     position="bottom"
     :style="{ height: '100%' }"
     closeable
     close-icon-position="top-left"
     round
     >
      <ChannelEdit :mychannel="UserChannelList" @update-active="changeChannel" :active="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/ArticleList.vue'
import ChannelEdit from './component/ChannelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'IndexView',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      isChannelShow: false,
      UserChannelList: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    changeChannel (index, isChannelShow = true) {
      this.active = index
      this.isChannelShow = isChannelShow
    },
    // 加载频道
    async loadUserChannels () {
      try {
        let channelArray = []
        if (this.user) {
          // 用户登录状态下获取在线频道
          const { data } = await getUserChannels()
          channelArray = data.data.channels
        } else {
          // 未登录情况下获取本地频道,判断本地是否有频道
          const localChannel = getItem('TOUTIAO_CHANNELS')
          // 如果本地有数据直接用
          if (localChannel) {
            channelArray = localChannel
          } else {
            // 没有的话直接请求在线默认频道
            const { data } = await getUserChannels()
            channelArray = data.data.channels
          }
        }
        this.UserChannelList = channelArray
      } catch (error) {
        console.log('获取失败！')
      }
    }
  }
}
</script>

<style lang="less">
.home{
  padding-top: 92px;
  padding-bottom: 50px;
  .van-nav-bar__title{
    max-width: unset;
  }
  .search-input{
    width: 552px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    color: #fff;
  }
  .nav-placeholder{
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
  .tab-nav{
    .van-tabs__content{
      padding-top: 89px;
    }
    .van-tabs__wrap{
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tabs__line{
      width: 36px;
      height: 6px;
      background-color: #3296fa;
    }
  }
  .nav-menu{
    width: 66px;
    height: 82px;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
  }
}
</style>