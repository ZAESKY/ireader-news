<template>
  <div class="about">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon @click="$router.back()" slot="left" name="cross" />
    </van-nav-bar>
    <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="phone-o"
        :rules="userFormRules.mobile"
      />
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入短信验证码"
        left-icon="qr"
        :rules="userFormRules.code"
      >
      <template #button>
        <van-count-down v-if="isCountShow" :time="1000 * 60" format="ss s" @finish="isCountShow = false" />
        <van-button v-else round @click="sendCode" native-type="button" class="send-code-btn" size="mini" type="default">发送验证码</van-button>
      </template>
    </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginView',
  components: {},
  props: {},
  data () {
    return {
      isCountShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空！'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误！'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空！'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误！'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(user)
        this.$toast.success('登录成功！')
        this.$store.commit('setUser', res.data)
      } catch (error) {
        if (error.response.status === 400) {
          console.log('手机号或验证码错误！')
          this.$toast.fail('手机号或验证码错误！')
        } else {
          console.log('登录失败，请稍后重试！', error)
          this.$toast.fail('登录失败，请稍后重试！')
        }
      }
    },
    async sendCode () {
      try {
        await this.$refs.loginForm.validate('mobile')
        this.isCountShow = true
      } catch (error) {
        return console.log('验证失败！', error)
      }
      console.log('验证成功')
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功！')
      } catch (error) {
        this.isCountShow = false
        if (error.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试')
        } else {
          this.$toast('发送失败！请重试！')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .send-code-btn{
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
</style>