/** 字典构造函数 */
function Dictionary(key, values) {
	this.key = key;
	this.values = values;
}

/**
 * 过滤器
 * @Author chenweibiao
 * @param  {Number|String}    key        字典key值
 * @param  {String}           emptyText  当找不到对应值时返回的默认值
 * @return {String} 返回对应的值
 */
Dictionary.prototype.filter = function(key, emptyText = '') {
	return this.values[key] || emptyText;
}

export const publishStatusObj = new Dictionary('publishStatus', {
	1: '未发布',
	2: '已发布'
})

export const orderStatusObj = new Dictionary('orderStatus', {
	1: '待支付',
	2: '已发货',
	3: '已收货',
	4: '已完成'
})

export const auditStatusObj = new Dictionary('auditStatus', {
	1: '未审核',
	2: '已审核'
})