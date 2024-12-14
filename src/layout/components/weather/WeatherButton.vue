<template>
	<BaseButton
		class="weatherButton"
		padding="0"
		round
	>
		<WeatherIconVideo
			ref="weatherIconVideoRef"
			:lat="lat"
			:lng="lng"
		/>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import WeatherIconVideo from './WeatherIconVideo.vue';

	const props = defineProps<{
		lat: string; // 緯度
		lng: string; // 經度
		width?: string; // 內容寬度
		height?: string; // 內容高度
		padding?: string; // 內容 Padding
	}>();

	const weatherIconVideoRef = ref();

	// 天氣類型
	const weatherType = computed(() => weatherIconVideoRef.value.weatherType);
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
