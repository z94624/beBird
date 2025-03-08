import { UnitSystemEnum } from '@/models/enum/tomorrowEnum';

/**
 * 天氣面板
 * 顯示資料格式
 */
export class WeatherPanelInfo {
	constructor(data?: WeatherPanelInfo) {
		if (!data) return;
		const {
			iconUrl = '',
			iconPath = '',
			iconDescription = '',
			sunriseTime = '',
			sunsetTime = '',
			temperature = 0,
			temperatureApparent = 0,
			precipitation = 0,
			humidity = 0,
			windSpeed = 0,
			windGust = 0,
			unit = UnitSystemEnum.METRIC,
			observationDatetime = '',
		} = data;
		this.iconUrl = iconUrl;
		this.iconPath = iconPath;
		this.iconDescription = iconDescription;
		this.sunriseTime = sunriseTime;
		this.sunsetTime = sunsetTime;
		this.temperature = temperature;
		this.temperatureApparent = temperatureApparent;
		this.precipitation = precipitation;
		this.humidity = humidity;
		this.windSpeed = windSpeed;
		this.windGust = windGust;
		this.unit = unit;
		this.observationDatetime = observationDatetime;
	}
	iconUrl: string = ''; // 天氣圖示 URL
	iconPath: string = ''; // 天氣圖示路徑
	iconDescription: string = ''; // 天氣圖示描述
	sunriseTime: string = ''; // 日出時間
	sunsetTime: string = ''; // 日落時間
	temperature: number = 0; // 溫度
	temperatureApparent?: number = 0; // 體感溫度
	precipitation: number = 0; // 降雨(雪)機率
	humidity: number = 0; // 濕度
	windSpeed: number = 0; // 風速
	windGust?: number = 0; // 最大陣風
	unit?: UnitSystemEnum = UnitSystemEnum.METRIC; // 公英制單位
	observationDatetime: string = ''; // 觀測時間
}
