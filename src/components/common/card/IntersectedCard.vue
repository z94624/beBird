<template>
	<div
		v-intersection="onIntersection"
		class="reveal-card"
	>
		<q-card
			:="attrs"
			class="intersectedCard cursor-pointer"
		>
			<template
				#[slot]
				v-for="(slot, sIdx) in Object.keys(slots)"
				:key="sIdx"
			>
				<slot :name="slot"></slot>
			</template>
		</q-card>
	</div>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QCard, QCardProps } from 'quasar';

	const attrs: Partial<QCardProps> = useAttrs();
	const slots: Partial<QCard> = useSlots();

	/**
	 * 處理捲動進場動畫
	 * 當元素進入可視範圍 (isIntersecting 為 true) 時加入顯示用 class。
	 * * @note Quasar v-intersection 規範必須回傳 boolean 值：
	 * - 回傳 false: 持續監聽該元素的交集狀態。
	 * - 回傳 true: 觸發後即註銷監聽器 (Unobserve)，提升效能。
	 */
	const onIntersection = (entry: IntersectionObserverEntry): boolean => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
		} else {
			// 若希望往上滑動時能再次觸發動畫，可保留以下這行；若希望只動畫一次則註解掉
			entry.target.classList.remove('reveal-active');
		}

		// 這裡回傳 false，讓元素離開畫面再回來時，動畫可以再次觸發
		return false;
	};
</script>

<style lang="scss" scoped>
	/* --- 捲動進場動畫 (Scroll Reveal) --- */
	.reveal-card {
		opacity: 0;
		/* 初始狀態：往下位移 30px，並縮小至 80% */
		transform: translateY(30px) scale(0.8);

		/* opacity 使用一般的 ease-out 讓淡入自然。
      transform 使用客製化的 cubic-bezier，
      其中大於 1 的數值 (1.56) 會讓元素放大超過 scale(1) 再彈回，形成果凍般的彈性效果 
    */
		transition:
			opacity 0.4s ease-out,
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.reveal-active {
		opacity: 1;
		/* 目標狀態：回到原始位置與 100% 大小 */
		transform: translateY(0) scale(1);
	}

	.intersectedCard {
		transition: all 0.3s ease;

		&:hover {
			@include boxShadow; /* 沿用您原本的 mixin 或寫法 */
			transform: translateY(-5px);
		}
	}
</style>
