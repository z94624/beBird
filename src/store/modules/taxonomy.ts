import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getEbirdTaxonomyApi } from '@/api/ref/taxonomy';
import { IREFTAXGetEbirdTaxonomyRes, REFTAXGetEbirdTaxonomyReq } from '@/models/ref/taxonomy';

import { useQuasarTool } from '@/hooks/useQuasarTool';
import { LocaleEnum } from '@/models/enum/ebirdEnum';

export const useTaxonomyStore = defineStore('taxonomy', () => {
	const { $notify, $loading } = useQuasarTool();

	const taxInfo = ref<IREFTAXGetEbirdTaxonomyRes[]>([]);

	/**
	 * 取得物種分類資訊
	 * @param locale 語系代碼
	 * @param species 物種代碼；comma separated
	 * @returns 分類
	 */
	const getEbirdTaxonomyInfo = async (locale: LocaleEnum, species: string) => {
		$loading.on();
		return getEbirdTaxonomyApi(
			new REFTAXGetEbirdTaxonomyReq({
				locale,
				species,
			})
		)
			.then((data) => {
				// $notify.success('成功：取得物種資訊');
				taxInfo.value = data;
				return Promise.resolve(data);
			})
			.catch((_msg) => {
				$notify.error('失敗：取得物種資訊');
				return Promise.reject(_msg);
			})
			.finally(() => {
				$loading.off();
			});
	};

	return {
		getEbirdTaxonomyInfo,
		taxInfo,
	};
});
