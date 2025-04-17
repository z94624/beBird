<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<q-header
				class="bg-white text-primary_e"
				elevated
			>
				<q-toolbar>
					<q-toolbar-title
						:shrink="true"
						class="cursor-pointer"
					>
						<span class="logoText text-primary">b</span>
						<span class="logoText text-accent">e</span>
						<span class="logoText text-secondaryDark_e">Bird</span>
					</q-toolbar-title>

					<q-tabs
						align="left"
						class="layoutHeaderTabs"
						inline-label
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

					<div class="flex no-wrap items-center gap-1">
						<!-- 天氣 -->
						<WeatherButton
							:lat="mapCenter.lat.toString()"
							:lng="mapCenter.lng.toString()"
							height="41.6px"
							padding="7px"
							width="41.6px"
						/>

						<!-- 人次 -->
						<BaseButton
							:icon="fasUsers"
							round
							text-color="primary"
						>
							<q-tooltip class="bg-white">
								<VisitorsBillboard />
							</q-tooltip>
						</BaseButton>

						<!-- 版本 -->
						<BaseButton
							:label="`v${versionList[0].version}`"
							rounded
							text-color="primary"
							@click="onOpenVersionDialog"
						/>

						<!-- 網站語言 -->
						<WebLangButton
							padding="0"
							rounded
						/>
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
	import WeatherButton from './components/weather/WeatherButton.vue';
	import VisitorsBillboard from '@/layout/components/VisitorsBillboard.vue';
	import VersionDialog from '@/layout/components/VersionDialog.vue';
	import WebLangButton from './components/WebLangButton.vue';
	import { fasUsers } from '@quasar/extras/fontawesome-v6';

	import { useLeafletStore } from '@/store/modules/geodata';
	import { PageEnum } from '@/models/enum/pageEnum';
	import { menuList } from './utils';
	import { versionList } from '@/layout/utils';

	const router = useRouter();
	// Leaflet Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);

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
	.logoText {
		font-size: 2.25rem;
		line-height: 2.5rem;
		font-weight: bold;
	}
</style>
