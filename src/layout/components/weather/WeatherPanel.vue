<template>
	<q-card>
		<q-card-section class="!pb-1">
			<div class="archContainer">
				<!-- 天氣圖示 -->
				<div class="flex justify-center items-center">
					<WeatherIconVideo
						:tooltip-props="{
							offset: [0, -40],
						}"
						:weatherType="weatherType"
						class="h-[150px]"
					/>
				</div>
				<!-- 日出落 -->
				<div class="flex justify-center gap-4">
					<div class="flex items-center gap-1">
						<WeatherIconVideo
							:weatherType="WeatherItemEnum.SUNRISE"
							width="40px"
						/>
						<span>{{ sunriseTime }}</span>
					</div>
					<div class="flex items-center gap-1">
						<WeatherIconVideo
							:weatherType="WeatherItemEnum.SUNSET"
							width="40px"
						/>
						<span>{{ sunsetTime }}</span>
					</div>
				</div>
			</div>
		</q-card-section>

		<q-card-section class="!pt-1">
			<div class="flex justify-around gap-2">
				<!-- 溫度 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.TEMP" />
					</div>
					<span>{{ temperature }}</span>
				</div>
				<!-- 機率 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.PRECIP" />
					</div>
					<span>{{ precipitation }}</span>
				</div>
				<!-- 濕度 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.HUMID" />
					</div>
					<span>{{ humidity }}</span>
				</div>
				<!-- 風速 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.WIND_SPEED" />
					</div>
					<span>{{ windSpeed }}</span>
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';
	import WeatherIconVideo from './WeatherIconVideo.vue';

	import { WeatherPanelInfo } from './types';
	import { WeatherItemEnum } from '@/models/enum/weatherEnum';

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

		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		padding: 40px 0 15px 0;
	}

	.weatherItemIconContainer {
		@extend %top-right-inset-shadow;

		width: 59px;
		padding: 15px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
