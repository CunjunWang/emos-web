import Vue from 'vue'
import App from './App'
import {constant} from "./common/constant";

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// 全局接口链接
let baseUrl = "http://localhost:9030/emos-wx-api"
Vue.prototype.url = {
    register: baseUrl + "/user/register",
    login: baseUrl + "/user/login",
    checkin: baseUrl + "/checkin/checkin",
    createFaceModel: baseUrl + "/checkin/faceModel",
    ableOrNot: baseUrl + "/checkin/ableOrNot",
    todayCheckin: baseUrl + '/checkin/today'
}

// 全局ajax方法
Vue.prototype.ajax = function (url, method, data, fun) {
    uni.request({
        "url": url,
        "method": method,
        "header": {
            token: uni.getStorageSync(constant.STORAGE_KEY_TOKEN)
        },
        "data": data,
        success: function (resp) {
            if (resp.statusCode === 401) {
                uni.redirectTo({
                    url: '../login/login'
                });
            } else if (resp.statusCode === 200 && resp.data.code === 200) {
                let data = resp.data;
                if (data.hasOwnProperty(constant.STORAGE_KEY_TOKEN)) {
                    console.log(resp.data);
                    let token = data.token;
                    uni.setStorageSync(constant.STORAGE_KEY_TOKEN, token);
                }
                fun(resp);
            } else {
                uni.showToast({
                    icon: "none",
                    title: resp.data
                });
            }
        }
    });
}

// 权限校验
Vue.prototype.checkPermission = function (permissions) {
    let userPermissions = uni.getStorageSync(constant.STORAGE_KEY_PERMISSIONS);
    for (let p in permissions)
        if (userPermissions.indexOf(p) !== -1)
            return true;
    return false;
}
