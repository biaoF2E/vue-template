import Vue from 'vue'
import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
/** 指定请求超时的毫秒数(0 表示无超时时间) */
axios.defaults.timeout = 60000000;
/** 表示跨域请求时是否需要使用凭证 */
axios.defaults.withCredentials = false;
/** 指定axios的请求url前缀默认值 */
axios.defaults.baseURL = process.env.VUE_APP_REQUEST_URL;

// 请求拦截
axios.interceptors.request.use(function (config) {

	let accessToken = store.state.admin_userInfo.accessToken;

	if (accessToken) {
		config.headers.accessToken = accessToken;
	}
    
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
	return Promise.reject(error.message);
});