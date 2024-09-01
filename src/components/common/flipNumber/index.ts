// https://github.com/waiaan/vue-flip-number

import FlipNumber from './FlipNumber.vue';
export default FlipNumber;
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('flip-number', FlipNumber);
}
