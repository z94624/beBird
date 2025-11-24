<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<q-header
				:class="[bg_class_mode, text_class_mode]"
				elevated
			>
				<q-toolbar>
					<q-toolbar-title
						class="cursor-pointer"
						style="flex: 0 0 auto"
					>
						<span class="logoText text-primary">b</span>
						<span class="logoText text-accent">e</span>
						<span
							:class="[text_class_mode]"
							class="logoText"
							>Bird</span
						>
					</q-toolbar-title>

					<q-tabs
						align="left"
						class="layoutHeaderTabs"
						inline-label
						no-caps
						outside-arrows
						stretch
					>
						<q-route-tab
							v-for="(menuItem, mIdx) in menuList"
							:key="mIdx"
							:class="[`${menuItem.name === 'rareBirds' ? 'rareBirdsTab' : ''}`]"
							:label="$t(menuItem.name)"
							:name="menuItem.name"
							:to="menuItem.to"
						/>
					</q-tabs>

					<q-space />

					<!-- 功能按鈕集 -->
					<!-- 字體極大時，以 Floating Action Button 顯示 -->
					<q-fab
						v-if="isTextSizeXl"
						id="layoutFeatureButton"
						direction="left"
						icon="extension"
					>
						<LayoutFeatureButtonSet @click-version-button="onOpenVersionDialog" />
					</q-fab>
					<!-- 字體非極大時，以展開顯示 -->
					<div
						v-else
						class="flex no-wrap items-center gap-1"
					>
						<LayoutFeatureButtonSet @click-version-button="onOpenVersionDialog" />
					</div>
				</q-toolbar>
			</q-header>

			<q-page-container style="height: 100vh">
				<router-view />
			</q-page-container>
		</q-layout>

		<VersionDialog ref="versionDialogRef" />
	</div>
</template>

<script lang="ts" setup>
	import { ref, toRefs } from 'vue';
	import { useRouter } from 'vue-router';
	import LayoutFeatureButtonSet from './components/LayoutFeatureButtonSet.vue';
	import VersionDialog from '@/layout/components/VersionDialog.vue';

	import { useModeStore, useTextSizeStore } from '@/store/modules/style';
	import { menuList } from './utils';
	import { PageEnum } from '@/models/enum/pageEnum';

	const router = useRouter();
	const textSizeStore = useTextSizeStore();
	const { isTextSizeXl } = toRefs(textSizeStore);
	const modeStore = useModeStore();
	const { bg_class_mode, text_class_mode } = toRefs(modeStore);

	const versionDialogRef = ref();

	/**
	 * 導向首頁
	 */
	const goHome = () => {
		router.replace(PageEnum.BASE_HOME);
	};

	/**
	 * 版本跳窗
	 */
	const onOpenVersionDialog = () => {
		versionDialogRef.value.open();
	};
</script>

<style lang="scss" scoped>
	// 字體大小 text-sizes.scss
	.logoText {
		font-weight: bold;
	}
</style>
