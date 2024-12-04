import { TimeFormatEnum } from '../enum/dielEnum';

/**
 * 取得特定日期的日出日落時間
 */
export class SUNRISETGetSunriseSunsetTimesReq {
	constructor(data?: SUNRISETGetSunriseSunsetTimesReq) {
		if (!data) return;
		const {
			lat = '23.97565',
			lng = '120.9738819',
			date = undefined,
			timezone = undefined,
			date_start = undefined,
			date_end = undefined,
			time_format = undefined,
		} = data;
		this.lat = lat;
		this.lng = lng;
		this.date = date;
		this.timezone = timezone;
		this.date_start = date_start;
		this.date_end = date_end;
		this.time_format = time_format;
	}
	lat: string = '23.97565'; // Latitude of the location in decimal degrees. Example: 38.907192
	lng: string = '120.9738819'; // Longitude of the location in decimal degrees. Example: -77.036873
	date?: string = undefined; // Date in YYYY-MM-DD format, you can also specify relative formats such as “today” and “tomorrow”. If not set it’ll default to today.
	timezone?: string = undefined; // Set a timezone of the returned times (timezone list). By default the API will return the times in the location’s timezone. If SunriseSunset cannot validate a timezone it’ll fallback to the default which is the location’s timezone. Example: UTC
	date_start?: string = undefined; // Date in YYYY-MM-DD format to specify a range, date_start will be used as a start date.
	date_end?: string = undefined; // Date in YYYY-MM-DD format used to specify the end of a date range. If this is left empty and date_start is set it’ll default to the current day.
	time_format?: TimeFormatEnum = undefined; // Format that all the times are displayed in. Default is a 12-hour clock but acceptable values include “24” for a 24-hour clock, “military” for military time, and “unix” for unix timestamps. Note that unix timestamps are only returned in UTC.
}

export interface ISUNRISETGetSunriseSunsetTimesRes {
	results: IResultItem; // 回傳結果
	status: 'OK' | 'ERROR'; // 響應狀態
}
export interface IResultItem {
	date: string; // "2023-11-29"
	sunrise: string; // "7:06:58 AM"
	sunset: string; // "4:48:45 PM"
	first_light: string; // "5:32:42 AM"
	last_light: string; // "6:23:02 PM"
	dawn: string; // "6:37:39 AM"
	dusk: string; // "5:18:04 PM"
	solar_noon: string; // "11:57:52 AM"
	golden_hour: string; // "4:07:57 PM"
	day_length: string; // "9:41:47"
	timezone: string; // "America/New_York"
	utc_offset: number; // -300
}
