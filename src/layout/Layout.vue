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

					<BaseButton
						:icon="fasUsers"
						flat
						round
						text-color="primary"
					>
						<q-tooltip class="bg-white">
							<VisitorsBillboard />
						</q-tooltip>
					</BaseButton>
					<BaseButton
						:label="`v${versionList[0].version}`"
						outline
						rounded
						text-color="primary"
						@click="onOpenVersionDialog"
					/>
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
	import VersionDialog from '@/layout/components/VersionDialog.vue';
	import VisitorsBillboard from '@/layout/components/VisitorsBillboard.vue';
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
