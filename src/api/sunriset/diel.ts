import {
	ISUNRISETGetSunriseSunsetTimesRes,
	SUNRISETGetSunriseSunsetTimesReq,
} from '@/models/sunriset/diel';
import { sunriset } from '@/plugins/axios';

/**
 * 取得特定日期的日出日落時間
 */
export const getSunriseSunsetTimesApi = (params: SUNRISETGetSunriseSunsetTimesReq) =>
	sunriset.get<ISUNRISETGetSunriseSunsetTimesRes>('/json', { params });
