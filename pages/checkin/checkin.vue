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
      // 拍照功能
      let that = this;
      if (that.btnText === constant.BTN_TEXT_TAKE_PICTURE)
        uni.createCameraContext().takePhoto({
          quality: 'high',
          success: function (resp) {
            console.log(resp.tempImagePath)
            that.photoPath = resp.tempImagePath;
            that.showCamera = false;
            that.showImage = true;
            that.btnText = constant.BTN_TEXT_CHECKIN;
          }
        });
      else {
        // 签到功能
        uni.showLoading({
          title: "签到中, 请稍后..."
        });
        setTimeout(function () {
          uni.hideLoading();
        }, 15000)

        uni.getLocation({
          type: "wgs84",
          success: function (resp) {
            qqMapSdk.reverseGeocoder({
              location: {
                latitude: resp.latitude,
                longitude: resp.longitude
              },
              success: function (resp) {
                let address = resp.result.address;
                let addressComponent = resp.result.address_component;
                let country = addressComponent.nation;
                let province = addressComponent.province;
                let city = addressComponent.city;
                let district = addressComponent.district;

                // 上传照片执行签到
                uni.uploadFile({
                  url: that.url.checkin,
                  filePath: that.photoPath,
                  name: "photo",
                  header: {
                    token: uni.getStorageSync("token")
                  },
                  formData: {
                    address, country, province, city, district
                  },
                  success: function (resp) {
                    console.log("签到resp: " + resp);
                    if (resp.statusCode === 500 && resp.data === "不存在人脸模型") {
                      uni.hideLoading();
                      uni.showModal({
                        title: "提示信息",
                        content: "系统中不存在你的人脸模型, 是否使用当前照片建模?",
                        success: function (res) {
                          if (res.confirm) // 用户确认, 上传照片
                            uni.uploadFile({
                              url: that.url.createFaceModel,
                              filePath: that.photoPath,
                              name: "photo",
                              header: {
                                token: uni.getStorageSync("token")
                              },
                              success: function (resp) {
                                if (resp.statusCode === 500)
                                  uni.showToast({
                                    title: resp.data,
                                    icon: "none"
                                  })
                                else if (resp.statusCode === 200)
                                  uni.showToast({
                                    title: "人脸建模成功",
                                    icon: "none"
                                  })
                              }
                            });
                        }
                      })
                    } else if (resp.statusCode === 200) {
                      let data = JSON.parse(resp.data);
                      let code = data.code;
                      let msg = data.msg;
                      if (code === 200) {
                        uni.hideLoading();
                        uni.showToast({
                          title: "签到成功",
                          complete: function() {
                            // TODO: 跳转到签到统计页面
                          }
                        })
                      }
                    } else if (resp.statusCode === 500) {
                      uni.showToast({
                        title: resp.data,
                        icon: "none"
                      })
                    }
                  }
                })
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
