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
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "王以太",
      avatarUrl: "",
      deptName: "技术部",
      address: "上海市虹口区",
      status: "正常",
      risk: "低风险",
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
