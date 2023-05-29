// 请求频道数据模块
import request from '@/utils/request'

// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除频道
export const deleteChannel = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}