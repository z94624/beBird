<template>
	<!-- 
		網站字體大小設計
		影片：https://www.youtube.com/watch?v=yUUdhCpOCFY&t=750s
	-->
	<div>
		<!-- 下雪公元 -->
		<Snow v-if="checkIsInChristmasSeason()" />

		<!-- 手機版選單 -->
		<LayoutM v-if="isMobile" />
		<!-- 電腦版選單 -->
		<Layout v-else />
	</div>
</template>

<script lang="ts" setup>
	import Layout from '@/layout/Layout.vue';
	import LayoutM from '@/layout/Layout-M.vue';

	import { usePlatform } from '@/hooks/platform';
	import { useBackExit } from '@/hooks/useBackExit';
	import { checkIsInChristmasSeason } from './utils/date';

	const { isMobile } = usePlatform();
	// 再按一次返回鍵離開本系統 Press back again to exit
	useBackExit();
</script>

<style lang="scss">
	@import 'styles/index';
</style>
