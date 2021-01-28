<template>
  <view>
    <image src="../../static/logo-1.png" class="logo"
           mode="widthFix"></image>
    <view class="logo-title">EMOS在线办公系统</view>
    <view class="logo-subtitle">Ver 2021.1</view>
    <button class="login-btn" open-type="getUserInfo" @tap="login()">登录系统</button>
    <view class="register-container">
      没有账号?
      <text class="register" @tap="toRegister()">立即注册</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
@import url("login.less");
</style>
