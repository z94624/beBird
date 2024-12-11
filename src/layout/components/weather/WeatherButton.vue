<template>
	<BaseButton
		class="weatherButton"
		padding="0"
		round
	>
		<video
			autoplay
			loop="true"
			muted
			preload="none"
		>
			<source
				:src="weatherVideoDict[weatherType]"
				type="video/mp4"
			/>
		</video>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import { weatherVideoDict, getWeatherTypeWithoutCode_tomorrow } from './utils';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
		width?: string; // 內容寬度
		height?: string; // 內容高度
	}>();

	const sunrisetStore = useSunrisetStore();
	const { diel } = toRefs(sunrisetStore);
	const tomorrowStore = useTomorrowStore();
	const { obsResult } = toRefs(tomorrowStore);

	const weatherType = ref(WeatherTypeEnum.UNKNOWN);

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
			padding: 7px;
		}
	}
</style>
