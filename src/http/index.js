import api from './api'

export default function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return api;
            }
        }
    })
}