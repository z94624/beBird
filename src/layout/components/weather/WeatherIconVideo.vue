<template>
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
</template>

<script lang="ts" setup>
	import { ref, useAttrs, watch } from 'vue';

	import { weatherDataDict } from './utils';
	import { WeatherTypeEnum } from '@/models/enum/weatherEnum';

	const props = defineProps<{
		weatherType: WeatherTypeEnum; // 天氣類型
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
