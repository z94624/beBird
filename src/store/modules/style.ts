import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { mdiSizeM, mdiSizeL, mdiSizeXl } from '@quasar/extras/mdi-v7';

import { IMap } from '@/models/common/base';
import { ModeEnum, TextSizeEnum } from '@/models/enum/styleEnum';

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
		[TextSizeEnum.MD]: {
			nick: 'md',
			multiplier: 1,
			icon: mdiSizeM,
		},
		[TextSizeEnum.LG]: {
			nick: 'lg',
			multiplier: 1.5,
			icon: mdiSizeL,
		},
		[TextSizeEnum.XL]: {
			nick: 'xl',
			multiplier: 2,
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
	const isTextSizeMd = computed(() => textSizeInfo.value.name === TextSizeEnum.MD);
	const isTextSizeLg = computed(() => textSizeInfo.value.name === TextSizeEnum.LG);
	const isTextSizeXl = computed(() => textSizeInfo.value.name === TextSizeEnum.XL);

	return {
		textSizeDict,
		textSizeMultiplier,
		textSizeInfo,
		isTextSizeMd,
		isTextSizeLg,
		isTextSizeXl,
	};
});

/**
 * 亮暗模式
 */
export const useModeStore = defineStore('mode', () => {
	// 現行模式
	const userMode = localStorage.getItem('mode') as ModeEnum | null;
	const mode = ref(userMode ?? ModeEnum.LIGHT);

	/**
	 * 給需要依據模式自訂樣式的
	 */
	// 背景色
	const bg_mode = computed(() => (mode.value === ModeEnum.LIGHT ? 'bg-white' : 'bg-dark'));

	/**
	 * 切換模式
	 */
	const toggleMode = () => {
		mode.value = mode.value === ModeEnum.LIGHT ? ModeEnum.DARK : ModeEnum.LIGHT;
		localStorage.setItem('mode', mode.value);
	};

	return {
		toggleMode,
		mode,
		bg_mode,
	};
});
