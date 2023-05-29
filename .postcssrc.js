// postcss.config.js
module.exports = {
  plugins: {
    // 把px转为rem
    'postcss-pxtorem': {
      // 基准值
      // 通过区别不同的样式设置基准值
      // rootValue: 37.5,
      rootValue ({ file }) {
        // 如果处理css路径包含vant则基准值围为37.5否则75
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 需要转换的元素，*为转换所有元素
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}