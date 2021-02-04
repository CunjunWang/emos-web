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
  </view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
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
  methods: {}
}
</script>

<style lang="less">
@import url("my.less");
</style>
