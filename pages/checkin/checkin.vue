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
      <button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">
        {{ btnText }}
      </button>
      <button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
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
      canCheckin: true,
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
  // onShow: function () {
  //   let that = this;
  //   that.ajax(that.url.ableOrNot, "GET", null, function (resp) {
  //     let msg = resp.data.msg;
  //     if (msg !== constant.CHECKIN_OK_TO_CHECKIN) {
  //       that.canCheckin = false;
  //       setTimeout(function () {
  //         uni.showToast({
  //           title: msg,
  //           icon: "none"
  //         })
  //       }, 1000)
  //     }
  //   });
  // },
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
          title: constant.CHECKIN_MSG_CHECKING_IN
        });
        setTimeout(function () {
          uni.hideLoading();
        }, 15000)

        uni.getLocation({
          type: "gps",
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
                    token: uni.getStorageSync(constant.STORAGE_KEY_TOKEN)
                  },
                  formData: {
                    address, country, province, city, district
                  },
                  success: function (resp) {
                    let data = JSON.parse(resp.data);
                    if (resp.statusCode === 500 && data.msg === constant.CHECKIN_MSG_NO_MODEL) {
                      uni.hideLoading();
                      uni.showModal({
                        title: "提示信息",
                        content: constant.CHECKIN_MSG_CREATE_MODEL,
                        success: function (res) {
                          if (res.confirm) // 用户确认, 上传照片
                            uni.uploadFile({
                              url: that.url.createFaceModel,
                              filePath: that.photoPath,
                              name: "photo",
                              header: {
                                token: uni.getStorageSync(constant.STORAGE_KEY_TOKEN)
                              },
                              success: function (resp) {
                                if (resp.statusCode === 500)
                                  uni.showToast({
                                    title: resp.data,
                                    icon: "none"
                                  })
                                else if (resp.statusCode === 200)
                                  uni.showToast({
                                    title: constant.CHECKIN_MSG_SUCCESS_CREATE_MODEL,
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
                          title: constant.CHECKIN_MSG_SUCCESS,
                          complete: function () {
                            // 跳转到签到统计页面
                            uni.navigateTo({
                              url: '../checkin_result/checkin_result'
                            })
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
