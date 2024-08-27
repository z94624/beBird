<template>
	<div class="flex flex-col gap-1 w-full">
		<div
			v-for="item in visitorStatList"
			:key="item.name"
			class="flex p-1"
		>
			<q-item-section>
				<div class="text-primary text-bold">{{ item.name }}</div>
			</q-item-section>
			<q-item-section>
				<VisitorsNumberAnimation
					:ref="item.ref"
					:to="item.to"
				/>
			</q-item-section>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useEventListener } from '@vueuse/core';
	import { useCookies } from '@vueuse/integrations/useCookies';
	import VisitorsNumberAnimation from '@/components/common/numberAnimation/VisitorsNumberAnimation.vue';

	import { useVisitorStatStore } from '@/store/modules/firebase';
	import { visitorStatNameMap } from '@/utils/firebase';
	import { VisitorStat } from '@/types/firebase';
	import { VisitorStatEnum } from '@/models/enum/firebaseEnum';

	const cookies = useCookies();
	const visitorStatStore = useVisitorStatStore();
	const { online, today, total } = toRefs(visitorStatStore);

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
				to: online.value,
			},
			[VisitorStatEnum.TODAY]: {
				name: visitorStatNameMap[VisitorStatEnum.TODAY],
				ref: todayRef,
				to: today.value,
			},
			[VisitorStatEnum.TOTAL]: {
				name: visitorStatNameMap[VisitorStatEnum.TOTAL],
				ref: totalRef,
				to: total.value,
			},
		};
	});

	watch(
		() => [online.value, today.value, total.value],
		() => {
			if (
				online.value !== undefined &&
				today.value !== undefined &&
				total.value !== undefined
			) {
				// 上次簽到日
				const signDate = cookies.get('visitorSignIn');
				// 是否為新一天的簽到
				const isNewDate = new Date().getDate() !== signDate;
				// 更新資料庫
				visitorStatStore
					.updateVisitorStat(
						new VisitorStat({
							online: online.value + 1,
							today: isNewDate ? today.value + 1 : today.value,
							total: isNewDate ? total.value + 1 : total.value,
						})
					)
					.then(() => {
						// 更新簽到日
						if (isNewDate) {
							cookies.set('visitorSignIn', new Date().getDate());
						}
					});
			}
		},
		{ once: true }
	);

	/**
	 * 監聽關閉視窗之前
	 */
	useEventListener(window, 'beforeunload', (e) => {
		// Recommended
		e.preventDefault();
		// Included for legacy support, e.g. Chrome/Edge < 119
		e.returnValue = true;

		// 更新資料庫：離線
		visitorStatStore.updateVisitorStat(
			new VisitorStat({
				online: online.value! - 1,
				today: today.value!,
				total: total.value!,
			})
		);
	});
</script>

<style lang="scss" scoped></style>
