import {
	ITOMORROWGetRealtimeWeatherRes,
	TOMORROWGetRealtimeWeatherReq,
} from '@/models/tomorrow/v4/weather';
import { tomorrow } from '@/plugins/axios';

/**
 * Realtime Weather
 */
export const getRealtimeWeatherApi = (params: TOMORROWGetRealtimeWeatherReq) =>
	tomorrow.get<ITOMORROWGetRealtimeWeatherRes>('/weather/realtime', { params });
