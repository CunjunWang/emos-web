<template>
  <view>
    <view class="stats">
      <image src="../../static/big-icon-1.png" mode="widthFix" class="icon-big"></image>
      <view class="report-title">
        <text class="days">{{ sumOnTime }}</text>
        <text class="unit">天</text>
      </view>
      <view class="sub-title">
        <text>本月签到</text>
      </view>
      <view class="report">
        <view class="column green">
          <text class="column-title">正常签到</text>
          <text class="number">{{ sumOnTime }}</text>
        </view>
        <view class="column yellow">
          <text class="column-title">迟到天数</text>
          <text class="number">{{ sumLate }}</text>
        </view>
        <view class="column red">
          <text class="column-title">缺勤天数</text>
          <text class="number">{{ sumAbsence }}</text>
        </view>
      </view>
      <view class="calendar-container">
        <uni-calendar :insert="true" :lunar="false" :selected="list"></uni-calendar>
      </view>
    </view>
  </view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';

export default {
  components: {
    uniCalendar
  },
  data() {
    return {
      list: {type: Array, default: []},
      sumOnTime: 0, // 准时签到
      sumAbsence: 0, // 缺勤
      sumLate: 0, // 迟到
    }
  },
  methods: {}
}
</script>

<style lang="less">
@import url('my_checkin.less');
</style>
