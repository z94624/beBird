import { ref } from 'vue';
import { QSelectOption } from 'quasar';
import { defineStore } from 'pinia';

import { IMap } from '@/models/common/base';
import { TextSizeEnum } from '@/models/enum/styleEnum';

/**
 * 字體大小
 */
export const useTextSizeStore = defineStore('textSize', () => {
	// 放大倍率字典
	const multiplierDict: IMap<number> = {
		[TextSizeEnum.SM]: 0.8,
		[TextSizeEnum.MD]: 1,
		[TextSizeEnum.LG]: 1.2,
		[TextSizeEnum.XL]: 1.4,
	};
	// 放大倍率選項
	const multiplierOptions: QSelectOption[] = Object.keys(multiplierDict).map((k) => ({
		label: k,
		value: multiplierDict[k].toString(),
	}));

	// 字體放大倍率
	const userMultiplier = localStorage.getItem('textSizeMultiplier');
	const textSizeMultiplier = ref(
		userMultiplier ? +userMultiplier : multiplierDict[TextSizeEnum.MD]
	);

	return {
		multiplierDict,
		multiplierOptions,
		textSizeMultiplier,
	};
});
