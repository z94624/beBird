<template>
	<q-card
		v-intersection="onIntersection"
		:="attrs"
		class="reveal-card"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-card>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QCard, QCardProps } from 'quasar';

	const attrs: Partial<QCardProps> = useAttrs();
	const slots: Partial<QCard> = useSlots();

	/**
	 * 處理捲動進場動畫
	 * 當元素進入可視範圍 (isIntersecting 為 true) 時加入顯示用 class
	 */
	const onIntersection = (entry: IntersectionObserverEntry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
		} else {
			// 若希望往上滑動時能再次觸發動畫，可保留以下這行；若希望只動畫一次則註解掉
			entry.target.classList.remove('reveal-active');
		}
	};
</script>

<style lang="scss" scoped>
	/* --- 捲動進場動畫 (Scroll Reveal) --- */
	.reveal-card {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	.reveal-active {
		opacity: 1;
		transform: translateY(0);
	}
</style>
