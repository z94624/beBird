import { UnitSystemEnum } from '@/models/enum/tomorrowEnum';

/**
 * Realtime Weather
 */
export class TOMORROWGetRealtimeWeatherReq {
	constructor(data?: TOMORROWGetRealtimeWeatherReq) {
		if (!data) return;
		const { location = '', units = UnitSystemEnum.METRIC } = data;
		this.location = location;
		this.units = units;
	}
	location: string = ''; // 地點；Latitude and Longitude (Decimal degree), City name, US zip, UK postcode
	units?: UnitSystemEnum = UnitSystemEnum.METRIC; // Unit system of the field values
}

export interface ITOMORROWGetRealtimeWeatherRes {
	data: ITOMORROWDataItem; // 即時天氣資訊
	location: ITOMORROWLocationItem; // 地點資訊
}
export interface ITOMORROWDataItem {
	time: string; // 觀測時間；EX: 2024-11-12T15:50:00Z
	values: ITOMORROWDataValueItem; // 觀測結果
}
export interface ITOMORROWDataValueItem {
	cloudBase: number;
	cloudCeiling: number;
	cloudCover: number;
	dewPoint: number;
	freezingRainIntensity: number;
	humidity: number;
	precipitationProbability: number;
	pressureSurfaceLevel: number;
	rainIntensity: number;
	sleetIntensity: number;
	snowIntensity: number;
	temperature: number;
	temperatureApparent: number;
	uvHealthConcern: number;
	uvIndex: number;
	visibility: number;
	weatherCode: number;
	windDirection: number;
	windGust: number;
	windSpeed: number;
}
export interface ITOMORROWLocationItem {
	lat: number; // latitude
	lon: number; // longitude
	name: string; // 地點名稱
	type: string; // 地點類型
}
