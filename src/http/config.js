import Vue from 'vue'
import axios from 'axios'
import { addPendingRequest, removePendingRequest } from '@/http/help'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
/** 指定请求超时的毫秒数(0 表示无超时时间) */
axios.defaults.timeout = 60000000;
/** 表示跨域请求时是否需要使用凭证 */
axios.defaults.withCredentials = false;
/** 指定axios的请求url前缀默认值 */
axios.defaults.baseURL = process.env.VUE_APP_REQUEST_URL;

// 请求拦截
axios.interceptors.request.use(function (config) {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response) {
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
    return response;
}, function (error) {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
        console.log("已取消的重复请求：" + error.message);
    } else {
        // 添加异常处理
    }
    return Promise.reject(error.message);
});