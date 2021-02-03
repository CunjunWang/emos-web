<template>
  <view class="page">
    <view class="summary-container">
      <view class="user-info">
        <image :src="avatarUrl" mode="widthFix" class="photo"></image>
        <view class="info">
          <text class="username">{{ username }}</text>
          <text class="dept">隶属部门: {{ deptName == null ? "" : deptName }}</text>
        </view>
      </view>
      <view class="date">{{ date }}</view>
    </view>
    <view class="result-container">
      <view class="left">
        <image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
        <image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
        <view class="line"></view>
      </view>
      <view class="right">
        <view class="row">
          <text class="start">上班 (时间 {{ attendanceTime }})</text>
        </view>
        <view class="row">
          <text class="checkin-time">签到时间 ({{ checkinTime }})</text>
          <text class="checkin-result green other" v-if="status === '正常'">{{ status }}</text>
          <text class="checkin-result yellow other" v-if="status === '迟到'">{{ status }}</text>
        </view>
        <view class="row">
          <image src="../../static/icon-7.png" mode="widthFix" class="icon-small"></image>
          <text class="desc">{{ address }}</text>
          <text class="checkin-result green" v-if="risk === '低风险'">{{ risk }}</text>
          <text class="checkin-result yellow" v-if="risk === '中风险'">{{ risk }}</text>
          <text class="checkin-result red" v-if="risk === '高风险'">{{ risk }}</text>
        </view>
        <view class="row">
          <image src="../../static/icon-8.png" mode="widthFix" class="icon-small"></image>
          <text class="desc">身份验证</text>
          <text class="checkin-result green">已通过</text>
        </view>
        <view class="row">
          <text class="end">下班 (时间 {{ closingTime }})</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "王以太",
      avatarUrl: "",
      deptName: "新零售事业群",
      address: "上海市虹口区",
      status: "正常",
      risk: "中风险",
      checkinTime: "08:25",
      date: "2021年2月3日",
      attendanceTime: "08:30",
      closingTime: "09:30",
      checkinDays: 201,
      weeklyCheckin: [
        {type: "工作日", day: "周一", status: "缺勤"},
        {type: "工作日", day: "周二", status: "迟到"},
        {type: "工作日", day: "周三", status: "正常"},
        {type: "工作日", day: "周四", status: "正常"},
        {type: "工作日", day: "周五", status: "正常"},
        {type: "休息日", day: "周六", status: ""},
        {type: "休息日", day: "周日", status: ""}
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less">
@import url("checkin_result.less");
</style>
