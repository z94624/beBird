<template>
	<div class="flex flex-col gap-1 w-full">
		<div class="flex p-1">
			<q-item-section>Online</q-item-section>
			<q-item-section>
				<NumberAnimation
					:duration="3"
					:format="(val: number) => val.toFixed()"
					:from="0"
					:to="online"
					autoplay
					easing="easeOutCubic"
				/>
			</q-item-section>
		</div>

		<div class="flex p-1">
			<q-item-section>Today</q-item-section>
			<q-item-section>
				<NumberAnimation
					:duration="3"
					:format="(val: number) => val.toFixed()"
					:from="0"
					:to="today"
					autoplay
					easing="easeOutCubic"
				/>
			</q-item-section>
		</div>

		<div class="flex p-1">
			<q-item-section>Total</q-item-section>
			<q-item-section>
				<NumberAnimation
					:duration="3"
					:format="(val: number) => val.toFixed()"
					:from="0"
					:to="total"
					autoplay
					easing="easeOutCubic"
				/>
			</q-item-section>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';
	import NumberAnimation from 'vue-number-animation';

	import { useVisitorStatStore } from '@/store/modules/firebase';

	const visitorStatStore = useVisitorStatStore();
	const { online, today, total } = toRefs(visitorStatStore);
</script>

<style lang="scss" scoped></style>
