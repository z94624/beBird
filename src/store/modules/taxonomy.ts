import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getEbirdTaxonomyApi } from '@/api/ref/taxonomy';
import { IREFTAXGetEbirdTaxonomyRes, REFTAXGetEbirdTaxonomyReq } from '@/models/ref/taxonomy';

import { useQuasarTool } from '@/hooks/useQuasarTool';
import { useI18n } from 'vue-i18n';
import { IMap } from '@/models/common/base';
import { LocaleEnum } from '@/models/enum/ebirdEnum';

export const useTaxonomyStore = defineStore('taxonomy', () => {
	const { $notify, $loading } = useQuasarTool();
	const { locale } = useI18n();

	const taxInfo = ref<IREFTAXGetEbirdTaxonomyRes[]>([]);
	const taxInfoDict = ref<IMap<IREFTAXGetEbirdTaxonomyRes>>({});

	/**
	 * 取得物種分類資訊
	 * @param species 物種代碼；comma separated
	 * @returns 分類
	 */
	const getEbirdTaxonomyInfo = async (species: string) => {
		$loading.on();
		return getEbirdTaxonomyApi(
			new REFTAXGetEbirdTaxonomyReq({
				locale: locale.value as LocaleEnum,
				species,
			})
		)
			.then((data) => {
				// $notify.success('成功：取得物種資訊');
				taxInfo.value = data;
				// 建立各物種資訊字典
				data.forEach((tax) => {
					taxInfoDict.value[tax.speciesCode] = tax;
				});
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
		taxInfoDict,
	};
});
