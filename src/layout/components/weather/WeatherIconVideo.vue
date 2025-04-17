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

		<q-tooltip
			v-if="!noTooltip"
			:="tooltipProps"
			:anchor="tooltipProps?.anchor ?? 'top middle'"
			:offset="tooltipProps?.offset ?? undefined"
			:self="tooltipProps?.self ?? 'center middle'"
		>
			{{ $t(weatherType) }}
		</q-tooltip>
	</div>
</template>

<script lang="ts" setup>
	import { ref, useAttrs, watch } from 'vue';

	import { weatherDataDict } from './utils';
	import { WeatherItemEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';
	import { QTooltipProps } from 'quasar';

	const props = defineProps<{
		weatherType: WeatherTypeEnum | WeatherItemEnum; // 天氣類型
		noTooltip?: boolean; // 是否不顯示 Tooltip
		tooltipProps?: QTooltipProps; // Tooltip 的屬性
	}>();

	const attrs = useAttrs();

	const videoLoading = ref(false);

	watch(
		() => props.weatherType,
		() => {
			// 強迫更新影片：從 UNKNOWN 類型更新為正確類型
			videoLoading.value = true;
			setTimeout(() => (videoLoading.value = false), 1);
		}
	);
</script>

<style lang="scss"></style>
