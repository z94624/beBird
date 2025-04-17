<template>
	<BaseButton
		class="weatherButton"
		padding="0"
		round
		@click="onOpenWeatherDialog"
	>
		<WeatherIconVideo
			:weatherType="weatherType"
			no-tooltip
		/>

		<q-tooltip>{{ $t(weatherType) }}</q-tooltip>
	</BaseButton>

	<WeatherDialog ref="weatherDialogRef" />
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';
	import WeatherIconVideo from './WeatherIconVideo.vue';
	import WeatherDialog from './WeatherDialog.vue';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import {
		weatherDataDict,
		getWeatherTypeWithCode_tomorrow,
		getWeatherTypeWithoutCode_tomorrow,
	} from './utils';
	import { WeatherPanelInfo } from './types';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
		width?: string; // 內容寬度
		height?: string; // 內容高度
		padding?: string; // 內容 Padding
	}>();

	const sunrisetStore = useSunrisetStore();
	const { sunResult, diel } = toRefs(sunrisetStore);
	const tomorrowStore = useTomorrowStore();
	const { obsResult, obsTime } = toRefs(tomorrowStore);

	// 天氣類型
	const weatherType = ref(WeatherTypeEnum.UNKNOWN);

	const weatherDialogRef = ref();

	const location = computed(() => `${props.lat}, ${props.lng}`);

	const onReload = useDebounceFn(() => {
		Promise.all([
			sunrisetStore.getSunriseSunsetTimesInfo(
				new SUNRISETGetSunriseSunsetTimesReq({
					lat: props.lat,
					lng: props.lng,
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
			onReload();
		},
		{ immediate: true }
	);

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
</script>

<style lang="scss">
	.weatherButton {
		.q-btn__content {
			width: v-bind(width);
			height: v-bind(height);
			padding: v-bind(padding);
		}
	}
</style>
