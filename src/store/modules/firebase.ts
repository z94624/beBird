import { computed } from 'vue';
import { defineStore } from 'pinia';
import { ref } from 'firebase/database';
import { useDatabaseObject } from 'vuefire';

import { db } from '@/plugins/firebase';
import { VisitorStat } from '@/types/firebase';

/**
 * 拜訪人次
 */
export const useVisitorStatStore = defineStore('visitorStat', () => {
	const visitorStatRef = ref(db, 'visitorStat');
	const visitorStat = useDatabaseObject<VisitorStat>(visitorStatRef);

	const online = computed(() => visitorStat.value?.online ?? 0);
	const today = computed(() => visitorStat.value?.today ?? 0);
	const total = computed(() => visitorStat.value?.total ?? 0);

	return {
		visitorStat,
		online,
		today,
		total,
	};
});
