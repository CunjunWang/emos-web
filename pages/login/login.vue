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
  methods: {
    toRegister: function () {
      uni.navigateTo({
        url: '../register/register'
      })
    },
    login: function () {
      let that = this;
      uni.login({
        provider: "weixin",
        success: function (resp) {
          let wxCode = resp.code;
          that.ajax(that.url.login, "POST", {wxCode}, function (resp) {
            let permissions = resp.data.permissions;
            uni.setStorageSync("permissions", permissions);
          })
          console.log("success");
          uni.switchTab({
            url: '../index/index'
          });
        },
        fail: function (e) {
          console.log(e);
          uni.showToast({
            icon: "none",
            title: "登录异常"
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("login.less");
</style>
