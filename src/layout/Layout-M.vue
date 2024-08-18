<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<q-header
				class="bg-white text-primary_e"
				elevated
				reveal
			>
				<q-toolbar>
					<q-btn
						flat
						icon="menu"
						round
						@click="toggleDrawer"
					/>
					<div
						class="cursor-pointer"
						@click="goHome"
					>
						<span class="logoText text-primary">b</span>
						<span class="logoText text-accent">e</span>
						<span class="logoText text-secondaryDark_e">Bird</span>
					</div>

					<q-toolbar-title></q-toolbar-title>
				</q-toolbar>
			</q-header>

			<q-drawer
				v-model="drawerOpen"
				:width="200"
				behavior="mobile"
				bordered
				class="text-primary_e"
				overlay
				side="left"
			>
				<q-scroll-area class="fit">
					<q-list class="layoutMenuList">
						<template
							v-for="(menuItem, mIdx) in menuList"
							:key="mIdx"
						>
							<q-item
								:active="menuItem.name === selectedMenu"
								:class="[`${menuItem.name === 'rareBirds' ? 'rareBirdsItem' : ''}`]"
								:to="menuItem.to"
								clickable
								@click="() => onSelectMenu(menuItem.name)"
							>
								<q-item-section avatar>
									<q-icon :name="menuItem.icon" />
								</q-item-section>
								<q-item-section>
									{{ menuItem.label }}
								</q-item-section>
							</q-item>
							<q-separator
								v-if="menuItem.separator"
								:key="'sep' + mIdx"
								inset
							/>
						</template>

						<q-item>
							<BaseButton
								:label="`v${versionList[0].version}`"
								class="!w-full"
								outline
								rounded
								text-color="primary"
								@click="onOpenVersionDialog"
							/>
						</q-item>
					</q-list>
				</q-scroll-area>
			</q-drawer>

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

	import { PageEnum } from '@/models/enum/pageEnum';
	import { menuList } from './utils';
	import { versionList } from '@/layout/utils';

	const router = useRouter();

	const drawerOpen = ref(false);
	const selectedMenu = ref('rareBirds');

	const versionDialogRef = ref();

	/**
	 * 開關選單
	 */
	const toggleDrawer = () => {
		drawerOpen.value = !drawerOpen.value;
	};

	/**
	 * 導向首頁
	 */
	const goHome = () => {
		router.replace(PageEnum.BASE_HOME);
	};

	/**
	 * 選擇選單
	 */
	const onSelectMenu = (menuName: string) => {
		selectedMenu.value = menuName;
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
