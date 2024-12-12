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
						@click="goHome"
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
							:label="menuItem.label"
							:name="menuItem.name"
							:to="menuItem.to"
						/>
					</q-tabs>

					<q-space />

					<div class="flex no-wrap items-center gap-1">
						<WeatherButton
							height="41.6px"
							lat="23.97565"
							lng="120.9738819"
							padding="7px"
							width="41.6px"
						/>

						<BaseButton
							:icon="fasUsers"
							round
							text-color="primary"
						>
							<q-tooltip class="bg-white">
								<VisitorsBillboard />
							</q-tooltip>
						</BaseButton>

						<BaseButton
							:label="`v${versionList[0].version}`"
							rounded
							text-color="primary"
							@click="onOpenVersionDialog"
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
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import WeatherButton from './components/weather/WeatherButton.vue';
	import VisitorsBillboard from '@/layout/components/VisitorsBillboard.vue';
	import VersionDialog from '@/layout/components/VersionDialog.vue';
	import { fasUsers } from '@quasar/extras/fontawesome-v6';

	import { PageEnum } from '@/models/enum/pageEnum';
	import { menuList } from './utils';
	import { versionList } from '@/layout/utils';

	const router = useRouter();

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
