<template>
	<q-card>
		<q-card-section>
			<div class="archContainer">
				<WeatherIconVideo
					:weatherType="weatherType"
					class="h-[100px]"
				/>
			</div>
		</q-card-section>

		<q-card-section>B</q-card-section>
	</q-card>
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';
	import WeatherIconVideo from './WeatherIconVideo.vue';

	import { WeatherPanelInfo } from './types';

	const props = defineProps<{
		weatherData: WeatherPanelInfo;
	}>();

	const {
		diel,
		weatherType,
		sunriseTime,
		sunsetTime,
		temperature,
		temperatureApparent,
		precipitation,
		humidity,
		windSpeed,
		windGust,
		observationDatetime,
	} = toRefs(props.weatherData);
</script>

<style lang="scss" scoped>
	%top-right-inset-shadow {
		box-shadow:
			rgb(0, 0, 0) -3px 3px 6px 0px inset,
			rgba(255, 255, 255, 0.5) 3px -3px 6px 1px inset;
	}

	.archContainer {
		@extend %top-right-inset-shadow;

		min-height: 100px;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
	}
</style>
