import Vue from 'vue'
import * as filters from '@/utils/dictionary'

for(let key in filters) {
	let self = filters[key];
	Vue.filter(self.key + 'Text', self.filter.bind(self))
}