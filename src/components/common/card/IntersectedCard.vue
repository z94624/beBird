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

	const attrs: Partial<QCardProps> = useAttrs() as any;
	const slots: Partial<QCard> = useSlots();

	/**
	 * ?•ç??²å??²å ´?•ç•«
	 * ?¶å?ç´ é€²å…¥?¯è?ç¯„å? (isIntersecting ??true) ?‚å??¥é¡¯ç¤ºç”¨ class??
	 * * @note Quasar v-intersection è¦ç?å¿…é??å‚³ boolean ?¼ï?
	 * - ?å‚³ false: ?ç???½è©²å?ç´ ç?äº¤é??€?‹ã€?
	 * - ?å‚³ true: è§¸ç™¼å¾Œå³è¨»éŠ·??½??(Unobserve)ï¼Œæ??‡æ??½ã€?
	 */
	const onIntersection = (entry: IntersectionObserverEntry): boolean => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
		} else {
			// ?¥å??›å?ä¸Šæ??•æ??½å?æ¬¡è§¸?¼å??«ï??¯ä??™ä»¥ä¸‹é€™è?ï¼›è‹¥å¸Œæ??ªå??«ä?æ¬¡å?è¨»è§£??
			entry.target.classList.remove('reveal-active');
		}

		// ?™è£¡?å‚³ trueï¼Œè??ƒç??¢é??«é¢?å?ä¾†æ?ï¼Œå??«å¯ä»¥å?æ¬¡è§¸??
		return true;
	};
</script>

<style lang="scss" scoped>
	/* --- ?²å??²å ´?•ç•« (Scroll Reveal) --- */
	.reveal-card {
		opacity: 0;
		/* ?å??€?‹ï?å¾€ä¸‹ä?ç§?30pxï¼Œä¸¦ç¸®å???80% */
		transform: translateY(30px) scale(0.8);

		/* opacity ä½¿ç”¨ä¸€?¬ç? ease-out è®“æ·¡?¥è‡ª?¶ã€?
      transform ä½¿ç”¨å®¢è£½?–ç? cubic-bezierï¼?
      ?¶ä¸­å¤§æ–¼ 1 ?„æ•¸??(1.56) ?ƒè??ƒç??¾å¤§è¶…é? scale(1) ?å??ï?å½¢æ??œå??¬ç?å½ˆæ€§æ???
    */
		transition:
			opacity 0.4s ease-out,
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.reveal-active {
		opacity: 1;
		/* ?®æ??€?‹ï??åˆ°?Ÿå?ä½ç½®??100% å¤§å? */
		transform: translateY(0) scale(1);
	}

	.intersectedCard {
		transition: all 0.3s ease;

		&:hover {
			@include boxShadow; /* æ²¿ç”¨?¨å??¬ç? mixin ?–å¯«æ³?*/
			transform: translateY(-5px);
		}
	}
</style>
