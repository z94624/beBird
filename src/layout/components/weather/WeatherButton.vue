<template>
	<BaseButton
		class="weatherButton"
		padding="0"
		round
	>
		<video
			v-if="!videoLoading"
			autoplay
			loop="true"
			muted
			playsinline
			preload="none"
		>
			<source
				:src="weatherVideoUrlDict[weatherType]"
				type="video/mp4"
			/>
			<source
				:src="weatherVideoDict[weatherType]"
				type="video/mp4"
			/>
		</video>

		<q-tooltip>{{ weatherDescDict[weatherType] }}</q-tooltip>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import {
		weatherDescDict,
		weatherVideoUrlDict,
		weatherVideoDict,
		getWeatherTypeWithoutCode_tomorrow,
	} from './utils';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
		width?: string; // 內容寬度
		height?: string; // 內容高度
		padding?: string; // 內容 Padding
	}>();

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
				weatherType.value = getWeatherTypeWithoutCode_tomorrow(obsResult.value, diel.value);
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
