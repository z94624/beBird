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
						<q-icon
							:name="`img:${BLetter}`"
							style="width: 19px; height: 26px"
						/>
						<q-icon
							:name="`img:${EbirdLogo}`"
							style="width: 73px; height: 26px"
						/>
					</div>

					<q-toolbar-title></q-toolbar-title>

					<BaseButton
						:label="`v${versionList[0].version}`"
						outline
						rounded
						text-color="primary"
						@click="onOpenVersionDialog"
					/>
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
							/>
						</template>
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
	import BLetter from '@/assets/images/b.svg';
	import EbirdLogo from '@/assets/images/eBird.svg';

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

<style lang="scss" scoped></style>
