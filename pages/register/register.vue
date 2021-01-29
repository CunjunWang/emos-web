<template>
  <view>
    <image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
    <view class="register-container">
      <input type="text" placeholder="输入你的邀请码" class="register-code"
             maxlength="6" v-model="registrationCode"/>
      <view class="register-desc">管理员创建员工证账号之后, 你可以从你的个人邮箱中获得注册邀请码</view>
      <button class="register-btn" open-type="getUserInfo" @tap="register()">注册账户</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      registrationCode: ""
    }
  },
  methods: {
    register: function () {
      let that = this;
      if (that.registrationCode == null || that.registrationCode.length === 0) {
        uni.showToast({
          icon: "none",
          title: "注册邀请码不能为空"
        })
        return;
      }
      if (!(/^[0-9]{6}$/.test(that.registrationCode))) {
        uni.showToast({
          icon: "none",
          title: "注册邀请码必须是6位数"
        })
        return;
      }
      uni.login({
        provider: "weixin",
        success: function (resp) {
          console.log(resp.code);
          let wxCode = resp.code;
          uni.getUserInfo({
            provider: "weixin",
            success: function (resp) {
              let nickName = resp.userInfo.nickName;
              let avatarUrl = resp.userInfo.avatarUrl;
              let data = {
                wxCode,
                avatarUrl,
                nickname: nickName,
                registrationCode: that.registrationCode
              }
              that.ajax(that.url.register, "POST", data, function (resp) {
                let permissions = resp.data.permissions;
                uni.setStorageSync("permissions", permissions);
                uni.switchTab({
                  url: '../index/index'
                });
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("register.less");
</style>
