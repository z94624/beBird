import { computed } from 'vue';
import { defineStore } from 'pinia';
import { ref, update } from 'firebase/database';
import { useDatabaseObject } from 'vuefire';

import { db } from '@/plugins/firebase';
import { VisitorsStatisticsInfo } from '@/types/firebase';

/**
 * 拜訪人次
 */
export const useVisitorsStatisticsStore = defineStore('visitorsStatistics', () => {
	const onlineInfoRef = ref(db, 'visitorsStatistics/onlineInfo');
	const onlineInfo = useDatabaseObject<VisitorsStatisticsInfo>(onlineInfoRef);
	const todayInfoRef = ref(db, 'visitorsStatistics/todayInfo');
	const todayInfo = useDatabaseObject<VisitorsStatisticsInfo>(todayInfoRef);
	const totalInfoRef = ref(db, 'visitorsStatistics/totalInfo');
	const totalInfo = useDatabaseObject<VisitorsStatisticsInfo>(totalInfoRef);

	const onlineNumber = computed(() => onlineInfo.value?.visitorNumber);
	const onlineUpdatedTime = computed(() => onlineInfo.value?.updatedTime);
	const todayNumber = computed(() => todayInfo.value?.visitorNumber);
	const todayUpdatedTime = computed(() => todayInfo.value?.updatedTime);
	const totalNumber = computed(() => totalInfo.value?.visitorNumber);
	const totalUpdatedTime = computed(() => totalInfo.value?.updatedTime);

	const updateOnlineInfo = (newInfo: VisitorsStatisticsInfo) => {
		return update(onlineInfoRef, newInfo);
	};
	const updateTodayInfo = (newInfo: VisitorsStatisticsInfo) => {
		return update(todayInfoRef, newInfo);
	};
	const updateTotalInfo = (newInfo: VisitorsStatisticsInfo) => {
		return update(totalInfoRef, newInfo);
	};

	return {
		updateOnlineInfo,
		onlineInfo,
		onlineNumber,
		onlineUpdatedTime,
		updateTodayInfo,
		todayInfo,
		todayNumber,
		todayUpdatedTime,
		updateTotalInfo,
		totalInfo,
		totalNumber,
		totalUpdatedTime,
	};
});
