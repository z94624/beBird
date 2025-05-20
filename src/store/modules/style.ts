import { computed, ref } from 'vue';
import { QSelectOption } from 'quasar';
import { defineStore } from 'pinia';

import { mdiSizeS, mdiSizeM, mdiSizeL, mdiSizeXl } from '@quasar/extras/mdi-v7';

import { IMap } from '@/models/common/base';
import { TextSizeEnum } from '@/models/enum/styleEnum';

/**
 * 字體大小
 */
export const useTextSizeStore = defineStore('textSize', () => {
	// 字體大小字典
	const textSizeDict: IMap<{
		nick: string;
		multiplier: number;
		icon: string;
	}> = {
		[TextSizeEnum.SM]: {
			nick: 'sm',
			multiplier: 0.5,
			icon: mdiSizeS,
		},
		[TextSizeEnum.MD]: {
			nick: 'md',
			multiplier: 1,
			icon: mdiSizeM,
		},
		[TextSizeEnum.LG]: {
			nick: 'lg',
			multiplier: 2,
			icon: mdiSizeL,
		},
		[TextSizeEnum.XL]: {
			nick: 'xl',
			multiplier: 4,
			icon: mdiSizeXl,
		},
	};

	// 字體放大倍率
	const userMultiplier = localStorage.getItem('textSizeMultiplier');
	const textSizeMultiplier = ref(
		userMultiplier ? +userMultiplier : textSizeDict[TextSizeEnum.MD].multiplier
	);

	/**
	 * 取得選定放大倍率所有資訊
	 */
	const textSizeInfo = computed(
		(): {
			name: string;
			nickName: string;
			multiplier: number;
			icon: string;
		} => {
			const item = Object.entries(textSizeDict).find(
				([_k, v]) => v.multiplier === textSizeMultiplier.value
			)!;
			return {
				name: item[0],
				nickName: item[1].nick,
				multiplier: item[1].multiplier,
				icon: item[1].icon,
			};
		}
	);

	return {
		textSizeDict,
		textSizeMultiplier,
		textSizeInfo,
	};
});
