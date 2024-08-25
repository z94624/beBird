<template>
	<div class="flex flex-col gap-1 w-full">
		<div
			v-for="item in statistics"
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
	import { computed, ref, toRefs } from 'vue';
	import VisitorsNumberAnimation from '@/components/common/numberAnimation/VisitorsNumberAnimation.vue';

	import { useVisitorStatStore } from '@/store/modules/firebase';
	import { visitorStatNameMap } from '@/utils/firebase';
	import { VisitorStatEnum } from '@/models/enum/firebaseEnum';

	const visitorStatStore = useVisitorStatStore();
	const { online, today, total } = toRefs(visitorStatStore);

	const onlineRef = ref();
	const todayRef = ref();
	const totalRef = ref();

	/**
	 * 拜訪人次統計資訊
	 */
	const statistics = computed(() => {
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
</script>

<style lang="scss" scoped></style>
