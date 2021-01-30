<template>
  <view class="page">
    <swiper circular="true" duration="500" interval="5000" class="swiper">
      <swiper-item>
        <image mode="widthFix"
               src="https://nixie-emos-static-1304902070.cos.ap-shanghai.myqcloud.com/img/banner/swiper-1.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image mode="widthFix"
               src="https://nixie-emos-static-1304902070.cos.ap-shanghai.myqcloud.com/img/banner/swiper-2.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image mode="widthFix"
               src="https://nixie-emos-static-1304902070.cos.ap-shanghai.myqcloud.com/img/banner/swiper-3.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image mode="widthFix"
               src="https://nixie-emos-static-1304902070.cos.ap-shanghai.myqcloud.com/img/banner/swiper-4.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image mode="widthFix"
               src="https://nixie-emos-static-1304902070.cos.ap-shanghai.myqcloud.com/img/banner/swiper-5.jpg"></image>
      </swiper-item>
    </swiper>
    <view class="notification-container">
      <view class="notification-title">
        <image src="../../static/icon-1.png" mode="widthFix"
               class="notification-icon"></image>
        消息提醒
      </view>
      <view class="notification-content">
        你有{{ unread }}条未读消息
      </view>
      <image src="../../static/icon-2.png" mode="widthFix"
             class="more-icon"></image>
    </view>
    <view class="nav-container">
      <view class="nav-row">
        <view class="nav-item" @tap="toPage('在线签到', '../checkin/checkin')">
          <image mode="widthFix" src="../../static/nav-1.png" class="icon"></image>
          <text class="name">在线签到</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-2.png" class="icon"></image>
          <text class="name">员工健康</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-3.png" class="icon"></image>
          <text class="name">在线请假</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-4.png" class="icon"></image>
          <text class="name">公务出差</text>
        </view>
      </view>
      <view class="nav-row">
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-5.png" class="icon"></image>
          <text class="name">员工日报</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-6.png" class="icon"></image>
          <text class="name">我的加班</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-7.png" class="icon"></image>
          <text class="name">付款申请</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-8.png" class="icon"></image>
          <text class="name">费用报销</text>
        </view>
      </view>
      <view class="nav-row">
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-9.png" class="icon"></image>
          <text class="name">公告通知</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-10.png" class="icon"></image>
          <text class="name">在线审批</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-11.png" class="icon"></image>
          <text class="name">物品领用</text>
        </view>
        <view class="nav-item">
          <image mode="widthFix" src="../../static/nav-12.png" class="icon"></image>
          <text class="name">采购申请</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      unread: 0
    }
  },
  onLoad() {

  },
  methods: {
    toPage: function (moduleName, url) {
      // TODO: 验证用户权限
      uni.navigateTo({
        url
      })
    }
  }
}
</script>

<style lang="less">
@import url("index.less");
</style>
