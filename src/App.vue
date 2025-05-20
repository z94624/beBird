<template>
	<div
		:style="{
			fontSize: `${textSizeMultiplier}rem`,
		}"
		:data-text-size="[textSizeInfo.nickName]"
	>
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
</style>
