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
					<span>{{ temperature }}{{ isMetric ? '℃' : '℉' }}</span>
				</div>
				<!-- 機率 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.PRECIP" />
					</div>
					<span>{{ precipitation }}%</span>
				</div>
				<!-- 濕度 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.HUMID" />
					</div>
					<span>{{ humidity }}%</span>
				</div>
				<!-- 風速 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.WIND_SPEED" />
					</div>
					<span>{{ windSpeed }}{{ isMetric ? 'm/s' : 'mph' }}</span>
				</div>
			</div>
		</q-card-section>

		<q-separator />

		<q-card-actions align="between">
			<!-- 天氣單位系統 -->
			<BaseToggle
				:color="isMetric ? 'positive' : 'negative'"
				:false-value="UnitSystemEnum.IMPERIAL"
				:model-value="unitSystem"
				:true-value="UnitSystemEnum.METRIC"
				keep-color
				@update:model-value="onUpdateUnitSystem"
			>
				<WeatherIconVideo
					:weatherType="isMetric ? WeatherItemEnum.C : WeatherItemEnum.F"
					width="40px"
				/>
			</BaseToggle>
			<!-- 觀測時間 -->
			<div class="flex items-center gap-1">
				<WeatherIconVideo
					:weatherType="WeatherItemEnum.OBS_TIME"
					width="40px"
				/>
				<span>{{ getFormattedDateTime(observationDatetime) }}</span>
			</div>
		</q-card-actions>
	</q-card>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs } from 'vue';
	import WeatherIconVideo from './WeatherIconVideo.vue';

	import { WeatherPanelInfo } from './types';
	import { getFormattedDateTime } from '@/utils/common';
	import { WeatherItemEnum } from '@/models/enum/weatherEnum';
	import { UnitSystemEnum } from '@/models/enum/tomorrowEnum';

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

	const unitSystem = ref(localStorage.getItem('weatherUnitSystem'));

	const isMetric = computed(() => unitSystem.value === UnitSystemEnum.METRIC);

	/**
	 * 切換單位系統
	 */
	const onUpdateUnitSystem = (val: UnitSystemEnum) => {
		unitSystem.value = val;
		// 儲存作為使用者預設單位系統
		localStorage.setItem('weatherUnitSystem', val);
	};
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
