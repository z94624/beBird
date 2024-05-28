import { computed } from 'vue';
import { defineStore } from 'pinia';
import { usePreferredLanguages } from '@vueuse/core';

import { LocaleEnum } from '@/models/enum/ebirdEnum';
import { GeoDataEnum } from '@/models/enum/geoEnum';

/**
 * 使用者偏好國家語系相關
 */
export const usePreferredLanguageStore = defineStore('preferredLanguage', () => {
	// 使用者偏好語言
	const userLangs = usePreferredLanguages();

	// 使用者偏好語系代碼
	const userLangCodes = computed(() =>
		userLangs.value.filter((lang) => lang.includes('-')).map((lang) => lang.split('-')[0])
	);
	// 使用者主要語系代碼
	const userLangCode = computed(() => {
		if (userLangCodes.value.includes(LocaleEnum.CHINESE)) {
			return LocaleEnum.CHINESE;
		} else {
			return userLangCodes.value[0];
		}
	});

	// 使用者偏好國家代碼
	const userCountryCodes = computed(() =>
		userLangs.value.filter((lang) => lang.includes('-')).map((lang) => lang.split('-')[1])
	);
	// 使用者主要國家代碼
	const userCountryCode = computed(() => {
		if (userCountryCodes.value.includes(GeoDataEnum.COUNTRYCODE_OF_TAIWAN)) {
			return GeoDataEnum.COUNTRYCODE_OF_TAIWAN;
		} else {
			return userCountryCodes.value[0];
		}
	});

	return {
		userLangs,
		userLangCodes,
		userLangCode,
		userCountryCodes,
		userCountryCode,
	};
});
