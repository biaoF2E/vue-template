/** 非生产环境 */
let _APIHOST = `${window.location.origin}/managerApiTest/`;

/** 生产环境 */
if ( process.env.NODE_ENV === 'production') {
	_APIHOST = `${window.location.origin}/managerApi/`;
}

export let APIHOST = _APIHOST;