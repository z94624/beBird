import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { getSunriseSunsetTimesApi } from '@/api/sunriset/diel';
import { IResultItem, SUNRISETGetSunriseSunsetTimesReq } from '@/models/sunriset/diel';
import { getRealtimeWeatherApi } from '@/api/tomorrow/v4/weather';
import {
	ITOMORROWDataValueItem,
	ITOMORROWLocationItem,
	TOMORROWGetRealtimeWeatherReq,
} from '@/models/tomorrow/v4/weather';

import { useQuasarTool } from '@/hooks/useQuasarTool';
import { DielEnum } from '@/models/enum/weatherEnum';

/**
 * SunriseSunset.io Store
 */
export const useSunrisetStore = defineStore('sunriset', () => {
	const { $notify, $loading } = useQuasarTool();

	const sunResult = ref<IResultItem>();

	// 是否為晝
	const diel = computed((): DielEnum => {
		const now = new Date();
		const nowStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
		return nowStr >= (sunResult.value?.sunrise ?? '06:00:00') &&
			nowStr < (sunResult.value?.sunset ?? '18:00:00')
			? DielEnum.DAY
			: DielEnum.NIGHT;
	});

	/**
	 * 取得特定日期的日出日落時間
	 */
	const getSunriseSunsetTimesInfo = (req: SUNRISETGetSunriseSunsetTimesReq) => {
		$loading.on();
		return getSunriseSunsetTimesApi(req)
			.then((res) => {
				sunResult.value = res.results;
				return Promise.resolve(res);
			})
			.catch((_msg) => {
				$notify.error('失敗：取得日出日落資訊');
				sunResult.value = undefined;
				return Promise.reject(_msg);
			})
			.finally(() => {
				$loading.off();
			});
	};

	return {
		getSunriseSunsetTimesInfo,
		sunResult,
		diel,
	};
});

/**
 * Tomorrow.io Store
 */
export const useTomorrowStore = defineStore('tomorrow', () => {
	const { $notify, $loading } = useQuasarTool();

	const obsTime = ref('');
	const obsResult = ref<ITOMORROWDataValueItem>();
	const obsLoc = ref<ITOMORROWLocationItem>();

	/**
	 * Realtime Weather
	 */
	const getRealtimeWeatherInfo = (req: TOMORROWGetRealtimeWeatherReq) => {
		$loading.on();
		return getRealtimeWeatherApi(req)
			.then((res) => {
				obsTime.value = res.data.time;
				obsResult.value = res.data.values;
				obsLoc.value = res.location;
				return Promise.resolve(res);
			})
			.catch((_msg) => {
				return Promise.reject(_msg);
			})
			.finally(() => {
				$loading.off();
			});
	};

	return {
		getRealtimeWeatherInfo,
		obsTime,
		obsResult,
		obsLoc,
	};
});
