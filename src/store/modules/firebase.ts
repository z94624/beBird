import { computed } from 'vue';
import { defineStore } from 'pinia';
import { ref, update } from 'firebase/database';
import { useDatabaseObject } from 'vuefire';

import { db } from '@/plugins/firebase';
import { VisitorStat } from '@/types/firebase';

/**
 * 拜訪人次
 */
export const useVisitorStatStore = defineStore('visitorStat', () => {
	const visitorStatRef = ref(db, 'visitorStat');
	const visitorStat = useDatabaseObject<VisitorStat>(visitorStatRef);

	const online = computed(() => visitorStat.value?.online);
	const today = computed(() => visitorStat.value?.today);
	const total = computed(() => visitorStat.value?.total);

	/**
	 * 更新
	 * @param newState 新狀態
	 * @returns Firebase Update Callback
	 */
	const updateVisitorStat = (newState: VisitorStat) => {
		return update(visitorStatRef, newState);
	};

	return {
		visitorStat,
		online,
		today,
		total,
		updateVisitorStat,
	};
});
