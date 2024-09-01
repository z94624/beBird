<template>
	<div class="flex flex-col !flex-nowrap gap-1 w-full">
		<div
			v-for="item in visitorStatList"
			:key="item.name"
			class="flex p-1"
		>
			<q-item-section>
				<div class="text-primary text-bold">{{ item.name }}</div>
			</q-item-section>
			<q-item-section>
				<FlipNumber
					:fontSize="30"
					:height="40"
					:value="item.to"
				/>
			</q-item-section>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useEventListener } from '@vueuse/core';
	import { useCookies } from '@vueuse/integrations/useCookies';
	import dayjs from 'dayjs';
	import FlipNumber from '@/components/common/flipNumber';

	import { useVisitorsStatisticsStore } from '@/store/modules/firebase';
	import { visitorStatNameMap } from '@/utils/firebase';
	import { standardDateTimeFormatString } from '@/utils/common';
	import { VisitorsStatisticsInfo } from '@/types/firebase';
	import { VisitorStatEnum } from '@/models/enum/firebaseEnum';

	const cookies = useCookies();
	const visitorsStatisticsStore = useVisitorsStatisticsStore();
	const { onlineNumber, todayNumber, todayUpdatedTime, totalNumber } =
		toRefs(visitorsStatisticsStore);

	const onlineRef = ref();
	const todayRef = ref();
	const totalRef = ref();

	/**
	 * 拜訪人次統計資訊
	 */
	const visitorStatList = computed(() => {
		return {
			[VisitorStatEnum.ONLINE]: {
				name: visitorStatNameMap[VisitorStatEnum.ONLINE],
				ref: onlineRef,
				to: onlineNumber.value,
			},
			[VisitorStatEnum.TODAY]: {
				name: visitorStatNameMap[VisitorStatEnum.TODAY],
				ref: todayRef,
				to: todayNumber.value,
			},
			[VisitorStatEnum.TOTAL]: {
				name: visitorStatNameMap[VisitorStatEnum.TOTAL],
				ref: totalRef,
				to: totalNumber.value,
			},
		};
	});

	// 是否為新的一天，若是則當日人次歸零
	const isNewUpdatedDate = computed(
		() =>
			new Date().getDate() !==
			dayjs(todayUpdatedTime.value, standardDateTimeFormatString).get('date')
	);

	// 上次簽到日
	const signDate = cookies.get('visitorSignIn');
	// 是否為新一天的簽到
	const isNewSignDate = new Date().getDate() !== signDate;

	/**
	 * 更新：在線人次
	 */
	watch(
		onlineNumber,
		() => {
			if (onlineNumber.value !== undefined) {
				visitorsStatisticsStore
					.updateOnlineInfo({
						...new VisitorsStatisticsInfo(),
						visitorNumber: onlineNumber.value + 1,
					})
					.then(() => {
						// 更新簽到日
						if (isNewSignDate) {
							cookies.set('visitorSignIn', new Date().getDate());
						}
					});
			}
		},
		{ once: true }
	);
	/**
	 * 更新：當日人次
	 */
	watch(
		todayNumber,
		() => {
			if (todayNumber.value !== undefined) {
				if (isNewSignDate) {
					visitorsStatisticsStore.updateTodayInfo({
						...new VisitorsStatisticsInfo(),
						visitorNumber: isNewUpdatedDate.value ? 1 : todayNumber.value + 1,
					});
				}
			}
		},
		{ once: true }
	);
	/**
	 * 更新：歷史人次
	 */
	watch(
		totalNumber,
		() => {
			if (totalNumber.value !== undefined) {
				if (isNewSignDate) {
					visitorsStatisticsStore.updateTotalInfo({
						...new VisitorsStatisticsInfo(),
						visitorNumber: totalNumber.value + 1,
					});
				}
			}
		},
		{ once: true }
	);

	/**
	 * 監聽關閉視窗之前
	 */
	useEventListener(window, 'beforeunload', (e) => {
		// 更新資料庫：離線
		visitorsStatisticsStore.updateOnlineInfo({
			...new VisitorsStatisticsInfo(),
			visitorNumber: onlineNumber.value! - 1,
		});
	});
</script>

<style lang="scss" scoped></style>
