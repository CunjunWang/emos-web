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
    <view class="checkin-report">
      <image src="../../static/big-icon-1.png" mode="widthFix" class="icon-big"></image>
      <view class="report-title">
        <text class="days">{{ checkinDays }}</text>
        <text class="unit">天</text>
      </view>
      <view class="sub-title">
        <text>累计签到</text>
        <view class="line"></view>
      </view>
      <view class="calendar-container">
        <view class="calendar" v-for="d in weeklyCheckin" :key="d">
          <image src="../../static/icon-9.png" mode="widthFix" class="calendar-icon" v-if="d.type === '工作日'"></image>
          <image src="../../static/icon-10.png" mode="widthFix" class="calendar-icon" v-if="d.type === '节假日'"></image>
          <text class="day">{{ d.day }}</text>
          <text class="result green" v-if="d.status === '正常'">{{ d.status }}</text>
          <text class="result yellow" v-if="d.status === '迟到'">{{ d.status }}</text>
          <text class="result red" v-if="d.status === '缺勤'">{{ d.status }}</text>
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
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er164JNVcRibNUWjC6MIZcIvDk9ccxVUsckybHj9tCBaZXhmI5PPGnSlZvcmdKV5d5QEkyUQcXArkw/132",
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
        {type: "节假日", day: "周六", status: ""},
        {type: "节假日", day: "周日", status: ""}
      ]
    }
  },
  onShow: function () {
    let that = this;
    that.ajax(this.url.todayCheckin, 'GET', null, function (resp) {
      let result = resp.data.result;
      that.username = result.name;
      that.avatarUrl = result.photo;
      that.deptName = result.deptName;
      that.address = result.address;
      that.status = result.status;
      that.risk = result.risk;
      that.checkinTime = result.checkinTime;
      that.date = result.date;
      that.attendanceTime = result.attendanceTime;
      that.closingTime = result.closingTime;
      that.checkinDays = result.checkinDays;
      that.weeklyCheckin = result.weeklyCheckin;
    });
  },
  methods: {}
}
</script>

<style lang="less">
@import url("checkin_result.less");
</style>
