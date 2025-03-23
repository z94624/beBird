<template>
	<q-card>
		<q-card-section class="!pb-1">
			<!-- 官方網站 -->
			<HrefButton
				class="absolute top-4 right-4"
				href="https://weather.tomorrow.io/"
				round
				size="11px"
			>
				<TomorrowIcon only-icon />
			</HrefButton>

			<div class="archContainer">
				<!-- 天氣圖示 -->
				<div class="flex justify-center items-center">
					<WeatherIconVideo
						:tooltip-props="{
							offset: [0, -40],
						}"
						:weatherType="data.weatherType"
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
						<span>{{ data.sunriseTime.slice(0, -3) }}</span>
					</div>
					<div class="flex items-center gap-1">
						<WeatherIconVideo
							:weatherType="WeatherItemEnum.SUNSET"
							width="40px"
						/>
						<span>{{ data.sunsetTime.slice(0, -3) }}</span>
					</div>
				</div>
			</div>
		</q-card-section>

		<q-card-section class="!pt-1">
			<div class="flex justify-around gap-1">
				<!-- 溫度 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.TEMP" />
					</div>
					<span>{{ data.temperatureApparent }}{{ isMetric ? '℃' : '℉' }}</span>
				</div>
				<!-- 機率 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.PRECIP" />
					</div>
					<span>{{ data.precipitationProbability }}%</span>
				</div>
				<!-- 濕度 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.HUMID" />
					</div>
					<span>{{ data.humidity }}%</span>
				</div>
				<!-- 風速 -->
				<div class="flex flex-col items-center gap-1">
					<div class="weatherItemIconContainer">
						<WeatherIconVideo :weatherType="WeatherItemEnum.WIND_SPEED" />
					</div>
					<span>{{ data.windSpeed }}{{ isMetric ? 'm/s' : 'mph' }}</span>
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
				left-label
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
				<span>{{ getFormattedDateTime(data.observationDatetime) }}</span>
			</div>
		</q-card-actions>
	</q-card>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue';
	import WeatherIconVideo from './WeatherIconVideo.vue';
	import TomorrowIcon from '@/assets/icons/weather/providers/TomorrowIcon.vue';

	import { TOMORROWGetRealtimeWeatherReq } from '@/models/tomorrow/v4/weather';

	import { useTomorrowStore } from '@/store/modules/weather';
	import { WeatherPanelInfo } from './types';
	import { getFormattedDateTime } from '@/utils/common';
	import { WeatherItemEnum } from '@/models/enum/weatherEnum';
	import { UnitSystemEnum } from '@/models/enum/tomorrowEnum';

	const props = defineProps<{
		weatherData: WeatherPanelInfo;
	}>();

	const tomorrowStore = useTomorrowStore();

	const unitSystem = ref(localStorage.getItem('weatherUnitSystem') ?? UnitSystemEnum.METRIC);
	const data = ref(new WeatherPanelInfo());

	const isMetric = computed(() => unitSystem.value === UnitSystemEnum.METRIC);

	watch(
		() => props.weatherData,
		(nv) => {
			data.value = nv;
		},
		{ immediate: true }
	);

	/**
	 * 切換單位系統
	 */
	const onUpdateUnitSystem = (val: UnitSystemEnum) => {
		unitSystem.value = val;

		// 儲存作為使用者預設天氣單位系統
		localStorage.setItem('weatherUnitSystem', val);

		/*
		 * 獲取該天氣單位系統的天氣資料
		 * 因不會頻繁切換，所以不需快取
		 */
		tomorrowStore
			.getRealtimeWeatherInfo(
				new TOMORROWGetRealtimeWeatherReq({
					location: data.value.location,
				})
			)
			.then((res) => {
				if (res) {
					data.value = {
						...data.value,
						...res.data.values,
						observationDatetime: res.data.time,
					};
				}
			});
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
