<template>
	<div>
		<!-- 手機版選單 -->
		<LayoutM v-if="isMobile" />
		<!-- 電腦版選單 -->
		<Layout v-else />
	</div>
</template>

<script lang="ts" setup>
	import Layout from '@/layout/Layout.vue';
	import LayoutM from '@/layout/Layout-M.vue';

	import { usePlatform } from '@/composables/platform';

	const { isMobile } = usePlatform();
</script>

<style lang="scss">
	@import 'styles/index';
</style>
