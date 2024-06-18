import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getEbirdTaxonomyApi } from '@/api/ref/taxonomy';
import { IREFTAXGetEbirdTaxonomyRes, REFTAXGetEbirdTaxonomyReq } from '@/models/ref/taxonomy';

import { LocaleEnum } from '@/models/enum/ebirdEnum';

export const useTaxonomyStore = defineStore('taxonomy', () => {
	const taxInfo = ref<IREFTAXGetEbirdTaxonomyRes[]>([]);

	/**
	 * 取得物種分類資訊
	 * @param locale 語系代碼
	 * @param species 物種代碼；comma separated
	 * @returns 分類
	 */
	const getEbirdTaxonomyInfo = async (locale: LocaleEnum, species: string) => {
		return getEbirdTaxonomyApi(
			new REFTAXGetEbirdTaxonomyReq({
				locale,
				species,
			})
		).then((data) => {
			taxInfo.value = data;
			return Promise.resolve(data);
		});
	};

	return {
		getEbirdTaxonomyInfo,
		taxInfo,
	};
});
