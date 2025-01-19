<template>
	<div>
		<IconVideo
			v-if="!videoLoading"
			:="attrs"
		>
			<source
				:src="weatherDataDict[weatherType].videoUrl"
				type="video/mp4"
			/>
			<source
				:src="weatherDataDict[weatherType].video"
				type="video/mp4"
			/>
		</IconVideo>

		<q-tooltip>{{ weatherDataDict[weatherType].desc }}</q-tooltip>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, useAttrs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import {
		weatherDataDict,
		getWeatherTypeWithoutCode_tomorrow,
		getWeatherTypeWithCode_tomorrow,
	} from './utils';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
	}>();

	const attrs = useAttrs();
	const sunrisetStore = useSunrisetStore();
	const { diel } = toRefs(sunrisetStore);
	const tomorrowStore = useTomorrowStore();
	const { obsResult } = toRefs(tomorrowStore);

	const weatherType = ref(WeatherTypeEnum.UNKNOWN);
	const videoLoading = ref(false);

	const location = computed(() => `${props.lat}, ${props.lng}`);

	watch(weatherType, () => {
		// 強迫更新影片：從 UNKNOWN 類型更新為正確類型
		videoLoading.value = true;
		setTimeout(() => (videoLoading.value = false), 1);
	});

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
	}, 2000);
	watch(
		location,
		() => {
			onReload();
		},
		{ immediate: true }
	);

	defineExpose({ weatherType });
</script>

<style lang="scss"></style>
