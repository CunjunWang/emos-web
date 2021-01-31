<template>
  <view>
    <camera device-position="front"
            flash="off"
            class="camera"
            @error="error"
            v-if="showCamera">
    </camera>
    <image mode="widthFix"
           class="image"
           :src="photoPath"
           v-if="showImage">
    </image>
    <view class="operate-container">
      <button type="primary" class="btn" @tap="clickBtn" :disabled="canCheckin">
        {{ btnText }}
      </button>
      <button type="warn" class="btn" @tap="afresh" :disabled="canCheckin">重拍</button>
    </view>
    <view class="notice-container">
      <text class="notice">注意事项</text>
      <text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
    </view>
  </view>
</template>

<script>
import {secret} from "common/secret";
import {constant} from "common/constant"

let QQMapWx = require('../../lib/qqmap-wx-jssdk.min')
let qqMapSdk;

export default {
  data() {
    return {
      canCheckin: false,
      photoPath: "",
      btnText: constant.BTN_TEXT_TAKE_PICTURE,
      showCamera: true,
      showImage: false
    }
  },
  onLoad: function () {
    qqMapSdk = new QQMapWx({
      key: secret.QQ_MAP_SECRET_KEY
    })
  },
  methods: {
    clickBtn: function () {
      let that = this;
      if (that.btnText === constant.BTN_TEXT_TAKE_PICTURE) {
        // 拍照功能
        let ctx = uni.createCameraContext();
        ctx.takePhoto({
          quality: 'high',
          success: function (resp) {
            console.log(resp.tempImagePath)
            that.photoPath = resp.tempImagePath;
            that.showCamera = false;
            that.showImage = true;
            that.btnText = constant.BTN_TEXT_CHECKIN;
          }
        })
      } else {
        // 签到功能
        uni.showLoading({
          title: "签到中, 请稍后..."
        });
        setTimeout(function () {
          uni.hideLoading();
        }, 30000)

        uni.getLocation({
          type: "wgs84",
          success: function (resp) {
            let lat = resp.latitude;
            let lon = resp.longitude;
            // console.log("lat: " + lat);
            // console.log("lon: " + lon);
            qqMapSdk.reverseGeocoder({
              location: {
                latitude: lat,
                longitude: lon
              },
              success: function (resp) {
                console.log(resp.result);
                let address = resp.result.address;
                let addressComponent = resp.result.address_component;
                let nation = addressComponent.nation;
                let province = addressComponent.province;
                let city = addressComponent.city;
                let district = addressComponent.district;
              }
            })
          }
        })
      }
    },
    afresh: function () {
      let that = this;
      that.showCamera = true;
      that.showImage = false;
      that.btnText = constant.BTN_TEXT_TAKE_PICTURE;
    }
  },
}
</script>

<style lang="less">
@import url("checkin.less");
</style>
