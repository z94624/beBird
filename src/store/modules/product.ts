import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getViewChecklistApi } from '@/api/product/product';
import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

import { useQuasarTool } from '@/hooks/useQuasarTool';

export const useProductStore = defineStore('product', () => {
	const { $notify, $loading } = useQuasarTool();

	const checklistInfo = ref<IPRODUCTGetViewChecklistRes>();

	/**
	 * 取得記錄清單詳細資訊
	 * @param subId 清單代碼
	 * @returns 清單詳細資訊
	 */
	const getViewChecklistInfo = (subId: string) => {
		$loading.on();
		return getViewChecklistApi(subId)
			.then((data) => {
				console.log('checklistInfo', data);
				$notify.success('成功：取得記錄清單詳細資訊');
				checklistInfo.value = data;
				return Promise.resolve(data);
			})
			.catch((_msg) => {
				$notify.error('失敗：取得記錄清單詳細資訊');
				return Promise.reject(_msg);
			})
			.finally(() => {
				$loading.off();
			});
	};

	return {
		getViewChecklistInfo,
		checklistInfo,
	};
});
