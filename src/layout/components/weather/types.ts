import { UnitSystemEnum } from '@/models/enum/tomorrowEnum';
import { DielEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';

/**
 * 天氣面板
 * 顯示資料格式
 */
export class WeatherPanelInfo {
	constructor(data?: WeatherPanelInfo) {
		if (!data) return;
		const {
			location = '',
			diel = DielEnum.DAY,
			weatherType = WeatherTypeEnum.UNKNOWN,
			sunriseTime = '',
			sunsetTime = '',
			temperature = 0,
			temperatureApparent = 0,
			precipitationProbability = 0,
			humidity = 0,
			windSpeed = 0,
			windGust = 0,
			unit = UnitSystemEnum.METRIC,
			observationDatetime = '',
		} = data;
		this.location = location;
		this.diel = diel;
		this.weatherType = weatherType;
		this.sunriseTime = sunriseTime;
		this.sunsetTime = sunsetTime;
		this.temperature = temperature;
		this.temperatureApparent = temperatureApparent;
		this.precipitationProbability = precipitationProbability;
		this.humidity = humidity;
		this.windSpeed = windSpeed;
		this.windGust = windGust;
		this.unit = unit;
		this.observationDatetime = observationDatetime;
	}
	location: string = ''; // 地點
	diel: DielEnum = DielEnum.DAY; // 晝夜
	weatherType: WeatherTypeEnum = WeatherTypeEnum.UNKNOWN; // 天氣類型
	sunriseTime: string = ''; // 日出時間
	sunsetTime: string = ''; // 日落時間
	temperature: number = 0; // 溫度
	temperatureApparent?: number = 0; // 體感溫度
	precipitationProbability: number = 0; // 降雨(雪)機率
	humidity: number = 0; // 濕度
	windSpeed: number = 0; // 風速
	windGust?: number = 0; // 最大陣風
	unit?: UnitSystemEnum = UnitSystemEnum.METRIC; // 公英制單位
	observationDatetime: string = ''; // 觀測時間
}
