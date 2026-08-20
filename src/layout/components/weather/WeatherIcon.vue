<template>
	<div>
		<!-- <IconVideo
			v-if="!loading"
			:="attrs"
		>
			<source
				:src="weatherDataDict[(weatherType || weatherItem)!].videoUrl"
				type="video/mp4"
			/>
			<source
				:src="weatherDataDict[(weatherType || weatherItem)!].video"
				type="video/mp4"
			/>
		</IconVideo> -->
		<q-icon
			v-if="!loading"
			:="attrs"
			:name="`img:${weatherDataDict[(weatherType || weatherItem)!].image}`"
		/>

		<q-tooltip
			v-if="!noTooltip"
			:="tooltipProps"
			:anchor="tooltipProps?.anchor ?? 'top middle'"
			:offset="tooltipProps?.offset ?? undefined"
			:self="tooltipProps?.self ?? 'center middle'"
		>
			{{ $t(weatherType ? `weather.types.${weatherType}` : `weather.items.${weatherItem}`) }}
		</q-tooltip>
	</div>
</template>

<script lang="ts" setup>
	import { ref, useAttrs, watch } from 'vue';

	import { weatherDataDict } from './utils';
	import { WeatherItemEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';
	import { QTooltipProps } from 'quasar';

	const props = defineProps<{
		weatherType?: WeatherTypeEnum; // 天氣類型
		weatherItem?: WeatherItemEnum; // 天氣項目
		noTooltip?: boolean; // 是否不顯示 Tooltip
		tooltipProps?: QTooltipProps; // Tooltip 的屬性
	}>();

	const attrs = useAttrs();

	const loading = ref(false);

	watch(
		() => props.weatherType,
		() => {
			// 強迫更新影片：從 UNKNOWN 類型更新為正確類型
			loading.value = true;
			setTimeout(() => (loading.value = false), 1);
		}
	);
</script>

<style lang="scss"></style>
