import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import './config'
import { APIHOST } from '@/utils/config'
import router from '@/router'

var api = {};

/**======== 读取service目录中的接口列表 ========*/
var files = require.context('./service/').keys().filter(item => item.match(/\.js$/));

files.forEach(item => {
    let _obj = require('./service/' + item.replace('./', '')).default;

    /** 默认设置空对象 */
    Object.keys(_obj).forEach(i => {
        if (!api[i]) { api[i] = {} }
        for (let k in _obj[i]) {
            putApi(i, k, _obj[i][k].url, _obj[i][k].method, _obj[i][k].dataFormat);
        }
    })

})

/**
 * [注册接口]
 * @param  {String} key        命名空间
 * @param  {String} name       接口别名
 * @param  {String} url        接口URL
 * @param  {String} method     请求方式
 * @param  {String} dataFormat 请求数据格式,默认json格式 (form | json)
 *
 */ 
function putApi(key, name, url, method = 'post', dataFormat = 'json') {
    /**
     * [往api对象集合添加接口]
     * @param  {Object}   options  [请求参数]
     */
    api[key][name] = (data = {}) => {
        let { isLoad = true, downloadName, isSerializer, ..._data } = data;

        if (isLoad) {
            Vue.prototype.$bus.emit('showLoad');
        }

        let _opts = {};

        /** 根据数据格式(dataFormat)设置请求头 */
        if (dataFormat === 'form' && method !== 'get') {
            _opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            _data = Qs.stringify(_data);
        }

        /** 设置参数 */
        if (method === 'get') {
            _opts.params = _data;
        } else {
            _opts.data = _data;
        }

        return axios(Object.assign({
            url: APIHOST + url,
            method
        }, _opts)).then((res) => {

            let { result_code, result_desc } = res.data;

            if (res) {
                if (result_code === '0') {
                    return res.data;
                }
            } else {
                Vue.prototype.$Message.error('未知错误');
                /** 返回格式与后端正常返回的格式保持一致 */
                return Promise.reject({
                    result_code: '3002',
                    result_desc: '未知错误'
                });
            }
        })
        .catch((err) => {
            if (err === 'Network Error') {
                Vue.prototype.$Message.error('网络错误');
            }
            return Promise.reject(err.result_code ? err : {
                result_code: '3002',
                result_desc: '未知错误'
            });
        })
    }

}

export default api;