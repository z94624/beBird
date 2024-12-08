<template>
	<div>{{ weatherType }}</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';

	import { SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useSunrisetStore, useTomorrowStore } from '@/store/modules/weather';
	import { getWeatherTypeWithoutCode_tomorrow } from './utils';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
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

<style lang="scss" scoped></style>
