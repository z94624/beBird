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

					<div class="flex-1 pr-[42px] text-center cursor-pointer">
						<span class="logoText text-primary">b</span>
						<span class="logoText text-accent">e</span>
						<span class="logoText text-secondaryDark_e">Bird</span>
					</div>
				</q-toolbar>
			</q-header>

			<q-drawer
				v-model="drawerOpen"
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

						<!-- 天氣 -->
						<q-item
							clickable
							@click="onOpenWeatherDialog"
						>
							<q-item-section avatar>
								<WeatherIconVideo
									:weatherType="weatherType"
									width="30px"
								/>
							</q-item-section>
							<q-item-section>Weather</q-item-section>
						</q-item>

						<!-- 版本 -->
						<q-item
							clickable
							@click="onOpenVersionDialog"
						>
							<q-item-section avatar>
								<q-icon name="o_library_add" />
							</q-item-section>
							<q-item-section>
								{{ `v${versionList[0].version}` }}
							</q-item-section>
						</q-item>

						<!-- 人次 -->
						<q-item>
							<VisitorsBillboard />
						</q-item>
					</q-list>
				</q-scroll-area>
			</q-drawer>

			<q-page-container style="height: 100vh">
				<router-view />
			</q-page-container>
		</q-layout>

		<WeatherDialog ref="weatherDialogRef" />

		<VersionDialog ref="versionDialogRef" />
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useRouter } from 'vue-router';
	import { useDebounceFn } from '@vueuse/core';
	import WeatherIconVideo from './components/weather/WeatherIconVideo.vue';
	import WeatherDialog from './components/weather/WeatherDialog.vue';
	import VersionDialog from '@/layout/components/VersionDialog.vue';
	import VisitorsBillboard from '@/layout/components/VisitorsBillboard.vue';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useLeafletStore } from '@/store/modules/geodata';
	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import { menuList } from './utils';
	import { versionList } from '@/layout/utils';
	import {
		getWeatherTypeWithCode_tomorrow,
		getWeatherTypeWithoutCode_tomorrow,
	} from './components/weather/utils';
	import { WeatherPanelInfo } from './components/weather/types';
	import { PageEnum } from '@/models/enum/pageEnum';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const router = useRouter();
	// Leaflet Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);
	const sunrisetStore = useSunrisetStore();
	const { sunResult, diel } = toRefs(sunrisetStore);
	const tomorrowStore = useTomorrowStore();
	const { obsResult, obsTime } = toRefs(tomorrowStore);

	const drawerOpen = ref(false);
	const selectedMenu = ref('rareBirds');
	// 天氣類型
	const weatherType = ref(WeatherTypeEnum.UNKNOWN);

	const weatherDialogRef = ref();
	const versionDialogRef = ref();

	const location = computed(() => `${mapCenter.value.lat}, ${mapCenter.value.lng}`);

	const onReloadWeather = useDebounceFn(() => {
		Promise.all([
			sunrisetStore.getSunriseSunsetTimesInfo(
				new SUNRISETGetSunriseSunsetTimesReq({
					lat: mapCenter.value.lat.toString(),
					lng: mapCenter.value.lng.toString(),
				})
			),
			tomorrowStore.getRealtimeWeatherInfo(
				new TOMORROWGetRealtimeWeatherReq({
					location: location.value,
				})
			),
		]).then(() => {
			if (obsResult.value) {
				// 先直接利用天氣代碼判斷
				weatherType.value = getWeatherTypeWithCode_tomorrow(obsResult.value, diel.value);
				if (weatherType.value === WeatherTypeEnum.UNKNOWN) {
					// 其次再用自訂規則判斷
					weatherType.value = getWeatherTypeWithoutCode_tomorrow(
						obsResult.value,
						diel.value
					);
				}
			}
		});
	}, 3000);
	watch(
		location,
		() => {
			// 地圖中心變動，重新取得該中心位置天氣資料
			onReloadWeather();
		},
		{ immediate: true }
	);

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
	 * 天氣詳情跳窗
	 */
	const onOpenWeatherDialog = () => {
		weatherDialogRef.value.open(
			new WeatherPanelInfo({
				location: location.value,
				diel: diel.value,
				weatherType: weatherType.value,
				sunriseTime: sunResult.value?.sunrise ?? '',
				sunsetTime: sunResult.value?.sunset ?? '',
				temperature: obsResult.value?.temperature ?? 0,
				temperatureApparent: obsResult.value?.temperatureApparent ?? 0,
				precipitationProbability: obsResult.value?.precipitationProbability ?? 0,
				humidity: obsResult.value?.humidity ?? 0,
				windSpeed: obsResult.value?.windSpeed ?? 0,
				windGust: obsResult.value?.windGust ?? 0,
				observationDatetime: obsTime.value,
			})
		);
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
