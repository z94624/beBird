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
						<q-icon
							:name="`img:${BLetter}`"
							style="width: 19px; height: 26px"
						/>
						<q-icon
							:name="`img:${EbirdLogo}`"
							style="width: 73px; height: 26px"
						/>
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
						:label="`v${version}`"
						outline
						rounded
						text-color="primary"
					/>
				</q-toolbar>
			</q-header>

			<q-page-container style="height: 100vh">
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from 'vue-router';
	import BLetter from '@/assets/images/b.svg';
	import EbirdLogo from '@/assets/images/eBird.svg';

	import { PageEnum } from '@/models/enum/pageEnum';
	import { menuList } from './utils';

	const router = useRouter();

	const version = import.meta.env.VITE_BEBIRD_VERSION;

	/**
	 * 導向首頁
	 */
	const goHome = () => {
		router.replace(PageEnum.BASE_HOME);
	};
</script>

<style lang="scss" scoped></style>
