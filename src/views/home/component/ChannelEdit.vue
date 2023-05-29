<template>
  <div class="ChannelEdit">
    <van-cell>
      <span slot="title" class="title-text">我的频道</span>
      <van-button plain type="danger" size="mini" round class="edit-btn" @click="isEdit = !isEdit" style="width: 50px;">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for="(channel,index) in mychannel" :key="index" class="grid-item" @click="onMychannelClick(channel,index)">
        <span slot="text" class="text" :class="{active: index === active}">{{ channel.name }}</span>
        <van-icon slot="icon" name="close" v-show="isEdit && !fixChannels.includes(channel.id)" />
      </van-grid-item>
    </van-grid>
    <van-cell>
      <span slot="title" class="title-text">频道列表</span>
    </van-cell>
    <van-grid :gutter="10" class="rec-grid">
      <van-grid-item v-for="(item,index) in recommendChannel" icon="plus" :key="index" :text="item.name" @click="addChannel(item)" class="grid-item" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    mychannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
    this.mychannels = this.mychannel
  },
  data () {
    return {
      allChannels: [], // 所有频道
      mychannels: [], // 我的频道
      isEdit: false, // 编辑状态
      fixChannels: [0] // 不可编辑的频道
    }
  },
  computed: {
    // 获取user状态
    ...mapState(['user']),
    // 获取除去我的频道里面的所有频道
    recommendChannel () {
      return this.allChannels.filter(channel => {
        return !this.mychannel.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    }
  },
  methods: {
    // 加载所有频道函数
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (error) {
        console.log('失败')
      }
    },
    // 处理添加频道函数
    async addChannel (item) {
      this.mychannels.push(item)
      // 数据持久化处理
      if (this.user) {
        await addUserChannel({
          id: item.id, // 频道ID
          seq: this.mychannels.length // 频道长度
        })
      } else {
        setItem('TOUTIAO_CHANNELS', this.mychannels)
      }
    },
    // 删除频道并持久化
    async onDeleteChannel (item) {
      try {
        if (this.user) {
          deleteChannel(item.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.mychannels)
        }
      } catch (error) {
        this.$toast('操作失败！')
      }
    },
    // 编辑频道函数
    onMychannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态
        // 如果是固定频道不显示删除按钮
        if (this.fixChannels.includes(channel.id)) {
          return false
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.mychannels.splice(index, 1)
        this.onDeleteChannel(channel)
      } else {
        // 未编辑状态
        console.log(1)
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style lang="less">
.ChannelEdit{
  padding-top: 70px;
  .title-text{
    font-size: 32px;
    color: #333333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  .grid-item{
    width: 16px;
    height: 86px;
    .van-grid-item__content{
      background-color: #f4f5f6;
    }
    .van-grid-item__text{
      font-size: 28px;
      color: #222;
      margin-top: 0;
      white-space: nowrap;
    }
  }
  .rec-grid{
    .grid-item{
      .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus{
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  .my-grid{
    .grid-item{
      .van-grid-item__icon-wrapper{
        position: unset;
      }
      .active{
        color: red;
      }
      .text{
        font-size: 28px;
        white-space: nowrap;
      }
      .van-icon-close{
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>