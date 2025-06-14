<template>
	<!-- 
		網站字體大小設計
		影片：https://www.youtube.com/watch?v=yUUdhCpOCFY&t=750s
	-->
	<div :data-text-size="textSizeInfo.nickName">
		<!-- 下雪公元 -->
		<Snow v-if="checkIsInChristmasSeason()" />

		<!-- 手機版選單 -->
		<LayoutM v-if="isMobile" />
		<!-- 電腦版選單 -->
		<Layout v-else />
	</div>
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';
	import Layout from '@/layout/Layout.vue';
	import LayoutM from '@/layout/Layout-M.vue';

	import { usePlatform } from '@/hooks/platform';
	import { useTextSizeStore } from '@/store/modules/style';
	import { checkIsInChristmasSeason } from './utils/date';

	const { isMobile } = usePlatform();
	const textSizeStore = useTextSizeStore();
	const { textSizeMultiplier, textSizeInfo } = toRefs(textSizeStore);
</script>

<style lang="scss">
	@import 'styles/index';

	/**
		* 網站字體大小
		*/
	.comName-font {
		// Tailwind: text-xs
		font-size: calc(1.125rem * v-bind(textSizeMultiplier));
		line-height: calc(1.75rem * v-bind(textSizeMultiplier));
	}
	.sciName-font {
		// Tailwind: text-lg
		font-size: calc(0.75rem * v-bind(textSizeMultiplier));
		line-height: calc(1rem * v-bind(textSizeMultiplier));
	}

	.q-tabs {
		&.layoutHeaderTabs {
			.q-tab {
				.q-tab__content {
					.q-tab__label {
						font-size: calc(1.0625rem * v-bind(textSizeMultiplier));
					}
				}
			}
		}
	}

	.q-list {
		&.layoutMenuList {
			.q-item {
				.q-item__section--main {
					font-size: calc(1.0625rem * v-bind(textSizeMultiplier));
				}
			}
		}
	}
</style>
