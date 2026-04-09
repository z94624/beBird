<template>
	<!-- 
		網站字體大小設計
		影片：https://www.youtube.com/watch?v=yUUdhCpOCFY&t=750s
	-->
	<div>
		<GlobalBackgroundEx />

		<!-- 下雪公元 -->
		<Snow v-if="checkIsInChristmasSeason()" />

		<!-- 手機版選單 -->
		<LayoutM v-if="isMobile" />
		<!-- 電腦版選單 -->
		<Layout v-else />
	</div>
</template>

<script lang="ts" setup>
	import { watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import { useI18n } from 'vue-i18n';
	import Layout from '@/layout/Layout.vue';
	import LayoutM from '@/layout/Layout-M.vue';
	import GlobalBackgroundEx from './components/common/background/GlobalBackgroundEx.vue';

	import { usePlatform } from '@/hooks/platform';
	import { checkIsInChristmasSeason } from './utils/date';

	const route = useRoute();
	const { t } = useI18n();
	const { isMobile } = usePlatform();

	/**
	 * 動態更新瀏覽器頁籤標題
	 * 結合 Vue 3 的 watchEffect 特性，
	 * 確保無論是「路由發生跳轉」或是「i18n 語系發生切換」，
	 * document.title 皆能即時觸發更新。
	 */
	watchEffect(() => {
		const titleKey = route.meta?.titleKey as string;

		if (titleKey) {
			document.title = `${t(titleKey)} | ${t('home')}`;
		} else {
			document.title = t('home');
		}
	});
</script>

<style lang="scss">
	@import 'styles/index';
</style>
