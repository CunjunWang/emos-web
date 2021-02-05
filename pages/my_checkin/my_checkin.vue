<template>
  <view>
    <view class="stats">
      <image src="../../static/big-icon-1.png" mode="widthFix" class="icon-big"></image>
      <view class="report-title">
        <text class="days">{{ sumOnTime + sumLate }}</text>
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
        <uni-calendar :insert="true" :lunar="false" :selected="list"
                      @monthSwitch="changeMonth" @confirm="changeMonth"></uni-calendar>
      </view>
    </view>
  </view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
import {constant} from "common/constant";

export default {
  components: {
    uniCalendar
  },
  data() {
    return {
      list: [],
      sumOnTime: 0, // 准时签到
      sumAbsence: 0, // 缺勤
      sumLate: 0, // 迟到
    }
  },
  onShow: function () {
    let that = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    that.searchCheckin(that, year, month);
  },
  methods: {
    searchCheckin: function (ref, year, month) {
      let that = ref;
      that.list.length = 0;
      that.ajax(that.url.monthlyCheckin, constant.HTTP_METHOD_POST, {year, month}, function (res) {
        console.log(res);
        for (let r of res.data.list)
          if (r.status !== null && r.status !== "") {
            let color = "";
            if (r.status === constant.CHECKIN_STATUS_OK)
              color = "green";
            else if (r.status === constant.CHECKIN_STATUS_LATE)
              color = "yellow";
            else if (r.status === constant.CHECKIN_STATUS_ABSENCE)
              color = "red"
            that.list.push({
              date: r.date,
              info: r.status,
              color
            })
          }
        that.sumOnTime = res.data.sumOnTime;
        that.sumLate = res.data.sumLate;
        that.sumAbsence = res.data.sumAbsence;
      })
    },
    changeMonth: function (e) {
      let that = this;
      let year = e.year;
      let month = e.month;
      that.searchCheckin(that, year, month);
    }
  }
}
</script>

<style lang="less">
@import url('my_checkin.less');
</style>
