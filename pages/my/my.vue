<template>
  <view class="page">
    <view class="user-info">
      <view class="border-outer">
        <view class="border-inner">
          <image :src="photo" mode="widthFix" class="photo"></image>
        </view>
      </view>
      <view class="summary">
        <view>
          <text class="title">姓名</text>
          <text class="value">{{ name }}</text>
        </view>
        <view>
          <text class="title">部门</text>
          <text class="value">{{ deptName }}</text>
        </view>
        <view>
          <text class="title">状态</text>
          <text class="value">在职</text>
        </view>
      </view>
    </view>
    <view class="list-title">用户信息</view>
    <uni-list>
      <uni-list-item title="个人资料" link to=""></uni-list-item>
      <uni-list-item title="我的考勤" link to="/pages/my_checkin/my_checkin"></uni-list-item>
      <uni-list-item title="罚款记录" link to=""></uni-list-item>
    </uni-list>
    <view class="list-title">系统管理</view>
    <uni-list>
      <uni-list-item title="员工管理" v-show="hasPermission(['ROOT', 'EMPLOYEE:SELECT'])" link to=""></uni-list-item>
      <uni-list-item title="部门管理" v-show="hasPermission(['ROOT', 'DEPT:SELECT'])" link to=""></uni-list-item>
      <uni-list-item title="权限管理" v-show="hasPermission(['ROOT', 'ROLE:SELECT'])" link to=""></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import {constant} from "common/constant";

export default {
  components: {
    uniList,
    uniListItem
  },
  data() {
    return {
      name: "",
      deptName: "",
      photo: ""
    }
  },
  onShow: function () {
    let that = this;
    that.ajax(that.url.userSummary, constant.HTTP_METHOD_GET, null, function (resp) {
      let result = resp.data.result;
      that.name = result.name;
      that.deptName = result.deptName;
      that.photo = result.photo;
    });
  },
  methods: {}
}
</script>

<style lang="less">
@import url("my.less");
</style>
