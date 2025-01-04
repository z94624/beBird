import WeatherVideo from '@assets/icons/weather/items/weather.mp4';
import WindyVideo from '@assets/icons/weather/types/windy.mp4';
import HurricaneVideo from '@assets/icons/weather/types/hurricane.mp4';
import ClearVideo from '@assets/icons/weather/types/clear.mp4';
import PartlyCloudyVideo from '@assets/icons/weather/types/partly_cloudy.mp4';
import CloudyVideo from '@assets/icons/weather/types/cloudy.mp4';
import ClearNightVideo from '@assets/icons/weather/types/clear_night.mp4';
import CloudyNightVideo from '@assets/icons/weather/types/cloudy_night.mp4';
import DrizzleVideo from '@assets/icons/weather/types/drizzle.mp4';
import RainVideo from '@assets/icons/weather/types/rain.mp4';
import ThunderStormVideo from '@assets/icons/weather/types/thunderstorm.mp4';
import SnowVideo from '@assets/icons/weather/types/snow.mp4';
import SleetVideo from '@assets/icons/weather/types/sleet.mp4';
import BlizzardVideo from '@assets/icons/weather/types/blizzard.mp4';
import FogVideo from '@assets/icons/weather/types/fog.mp4';
import ColdVideo from '@assets/icons/weather/types/cold.mp4';
import HotVideo from '@assets/icons/weather/types/hot.mp4';
import SunriseVideo from '@assets/icons/weather/types/sunrise.mp4';
import SunsetVideo from '@assets/icons/weather/types/sunset.mp4';

import WeatherImg from '@assets/icons/weather/items/weather.png';
import WindyImg from '@assets/icons/weather/types/windy.png';
import HurricaneImg from '@assets/icons/weather/types/hurricane.png';
import ClearImg from '@assets/icons/weather/types/clear.png';
import PartlyCloudyImg from '@assets/icons/weather/types/partly_cloudy.png';
import CloudyImg from '@assets/icons/weather/types/cloudy.png';
import ClearNightImg from '@assets/icons/weather/types/clear_night.png';
import CloudyNightImg from '@assets/icons/weather/types/cloudy_night.png';
import DrizzleImg from '@assets/icons/weather/types/drizzle.png';
import RainImg from '@assets/icons/weather/types/rain.png';
import ThunderStormImg from '@assets/icons/weather/types/thunderstorm.png';
import SnowImg from '@assets/icons/weather/types/snow.png';
import SleetImg from '@assets/icons/weather/types/sleet.png';
import BlizzardImg from '@assets/icons/weather/types/blizzard.png';
import FogImg from '@assets/icons/weather/types/fog.png';
import ColdImg from '@assets/icons/weather/types/cold.png';
import HotImg from '@assets/icons/weather/types/hot.png';
import SunriseImg from '@assets/icons/weather/types/sunrise.png';
import SunsetImg from '@assets/icons/weather/types/sunset.png';

import { IMap } from '@/models/common/base';
import { DielEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';
import { ITOMORROWDataValueItem } from '@/models/tomorrow/v4/weather';

/**
 * 天氣圖示對應天氣代碼
 * https://docs.tomorrow.io/reference/data-layers-weather-codes
 */
export const weatherCodeDict_tomorrow: IMap<number[]> = {
	[WeatherTypeEnum.UNKNOWN]: [0],

	[WeatherTypeEnum.CLEAR]: [1000, 1100],
	[WeatherTypeEnum.PARTLY_CLOUDY]: [1101],
	[WeatherTypeEnum.CLOUDY]: [1102, 1001],

	[WeatherTypeEnum.CLEAR_NIGHT]: [1000, 1100],
	[WeatherTypeEnum.CLOUDY_NIGHT]: [1101, 1102, 1001],

	[WeatherTypeEnum.DRIZZLE]: [4000],
	[WeatherTypeEnum.RAIN]: [4001, 4200, 4201],
	[WeatherTypeEnum.THUNDER_STORM]: [8000],

	[WeatherTypeEnum.SNOW]: [5000, 5001, 5100],
	[WeatherTypeEnum.SLEET]: [6000, 6001, 6200, 6201, 7000, 7101, 7102],
	[WeatherTypeEnum.BLIZZARD]: [5101],

	[WeatherTypeEnum.FOG]: [2000, 2100],
};
/**
 * 天氣圖示對應文字說明
 */
export const weatherDescDict: IMap<string> = {
	[WeatherTypeEnum.UNKNOWN]: 'Weather(天氣)',

	[WeatherTypeEnum.WINDY]: 'Windy(多風)',
	[WeatherTypeEnum.HURRICANE]: 'Typhoon/Hurricane/Cyclone(強風)',

	[WeatherTypeEnum.CLEAR]: 'Sunny(晴天)',
	[WeatherTypeEnum.PARTLY_CLOUDY]: 'Partly Cloudy(晴時多雲)',
	[WeatherTypeEnum.CLOUDY]: 'Cloudy(多雲時陰)',

	[WeatherTypeEnum.CLEAR_NIGHT]: 'Clear Night(晴夜)',
	[WeatherTypeEnum.CLOUDY_NIGHT]: 'Cloudy Night(陰夜)',

	[WeatherTypeEnum.DRIZZLE]: 'Drizzle(細雨)',
	[WeatherTypeEnum.RAIN]: 'Rainy(雨天)',
	[WeatherTypeEnum.THUNDER_STORM]: 'Thunder Storm(暴風雨)',

	[WeatherTypeEnum.SNOW]: 'Snowy(降雪)',
	[WeatherTypeEnum.SLEET]: 'Sleet(冰霰)',
	[WeatherTypeEnum.BLIZZARD]: 'Blizzard(暴風雪)',

	[WeatherTypeEnum.FOG]: 'Foggy(多霧)',

	[WeatherTypeEnum.COLD]: 'Cold(冷)',
	[WeatherTypeEnum.HOT]: 'Hot(熱)',

	[WeatherTypeEnum.SUNRISE]: 'Sunrise(日昇)',
	[WeatherTypeEnum.SUNSET]: 'Sunset(日落)',
};
/**
 * 天氣影片圖示對應來源 URL
 */
export const weatherVideoUrlDict: IMap<string> = {
	[WeatherTypeEnum.UNKNOWN]: 'https://cdn-icons-mp4.flaticon.com/512/14464/14464176.mp4',

	[WeatherTypeEnum.WINDY]: 'https://cdn-icons-mp4.flaticon.com/512/17484/17484929.mp4',
	[WeatherTypeEnum.HURRICANE]: 'https://cdn-icons-mp4.flaticon.com/512/17858/17858147.mp4',

	[WeatherTypeEnum.CLEAR]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455017.mp4',
	[WeatherTypeEnum.PARTLY_CLOUDY]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455053.mp4',
	[WeatherTypeEnum.CLOUDY]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455024.mp4',

	[WeatherTypeEnum.CLEAR_NIGHT]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455031.mp4',
	[WeatherTypeEnum.CLOUDY_NIGHT]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455043.mp4',

	[WeatherTypeEnum.DRIZZLE]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455057.mp4',
	[WeatherTypeEnum.RAIN]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455055.mp4',
	[WeatherTypeEnum.THUNDER_STORM]: 'https://cdn-icons-mp4.flaticon.com/512/17858/17858190.mp4',

	[WeatherTypeEnum.SNOW]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455036.mp4',
	[WeatherTypeEnum.SLEET]: 'https://cdn-icons-mp4.flaticon.com/512/17858/17858163.mp4',
	[WeatherTypeEnum.BLIZZARD]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455058.mp4',

	[WeatherTypeEnum.FOG]: 'https://cdn-icons-mp4.flaticon.com/512/6454/6454995.mp4',

	[WeatherTypeEnum.COLD]: 'https://cdn-icons-mp4.flaticon.com/512/6455/6455060.mp4',
	[WeatherTypeEnum.HOT]: 'https://cdn-icons-mp4.flaticon.com/512/6454/6454983.mp4',

	[WeatherTypeEnum.SUNRISE]: 'https://cdn-icons-mp4.flaticon.com/512/14193/14193984.mp4',
	[WeatherTypeEnum.SUNSET]: 'https://cdn-icons-mp4.flaticon.com/512/8800/8800140.mp4',
};
/**
 * 天氣影片圖示對應檔案路徑
 */
export const weatherVideoDict: IMap<string> = {
	[WeatherTypeEnum.UNKNOWN]: WeatherVideo,

	[WeatherTypeEnum.WINDY]: WindyVideo,
	[WeatherTypeEnum.HURRICANE]: HurricaneVideo,

	[WeatherTypeEnum.CLEAR]: ClearVideo,
	[WeatherTypeEnum.PARTLY_CLOUDY]: PartlyCloudyVideo,
	[WeatherTypeEnum.CLOUDY]: CloudyVideo,

	[WeatherTypeEnum.CLEAR_NIGHT]: ClearNightVideo,
	[WeatherTypeEnum.CLOUDY_NIGHT]: CloudyNightVideo,

	[WeatherTypeEnum.DRIZZLE]: DrizzleVideo,
	[WeatherTypeEnum.RAIN]: RainVideo,
	[WeatherTypeEnum.THUNDER_STORM]: ThunderStormVideo,

	[WeatherTypeEnum.SNOW]: SnowVideo,
	[WeatherTypeEnum.SLEET]: SleetVideo,
	[WeatherTypeEnum.BLIZZARD]: BlizzardVideo,

	[WeatherTypeEnum.FOG]: FogVideo,

	[WeatherTypeEnum.COLD]: ColdVideo,
	[WeatherTypeEnum.HOT]: HotVideo,

	[WeatherTypeEnum.SUNRISE]: SunriseVideo,
	[WeatherTypeEnum.SUNSET]: SunsetVideo,
};
/**
 * 天氣圖片圖示對應檔案路徑
 */
export const weatherImgDict: IMap<string> = {
	[WeatherTypeEnum.UNKNOWN]: WeatherImg,

	[WeatherTypeEnum.WINDY]: WindyImg,
	[WeatherTypeEnum.HURRICANE]: HurricaneImg,

	[WeatherTypeEnum.CLEAR]: ClearImg,
	[WeatherTypeEnum.PARTLY_CLOUDY]: PartlyCloudyImg,
	[WeatherTypeEnum.CLOUDY]: CloudyImg,

	[WeatherTypeEnum.CLEAR_NIGHT]: ClearNightImg,
	[WeatherTypeEnum.CLOUDY_NIGHT]: CloudyNightImg,

	[WeatherTypeEnum.DRIZZLE]: DrizzleImg,
	[WeatherTypeEnum.RAIN]: RainImg,
	[WeatherTypeEnum.THUNDER_STORM]: ThunderStormImg,

	[WeatherTypeEnum.SNOW]: SnowImg,
	[WeatherTypeEnum.SLEET]: SleetImg,
	[WeatherTypeEnum.BLIZZARD]: BlizzardImg,

	[WeatherTypeEnum.FOG]: FogImg,

	[WeatherTypeEnum.COLD]: ColdImg,
	[WeatherTypeEnum.HOT]: HotImg,

	[WeatherTypeEnum.SUNRISE]: SunriseImg,
	[WeatherTypeEnum.SUNSET]: SunsetImg,
};

/**
 * 從 Tomorrow.io 天氣代碼判斷屬於哪種天氣類型
 * @param values Tomorrow.io 即時天氣資料
 * @param diel 晝夜
 * @returns 天氣類型
 */
export const getWeatherTypeWithCode_tomorrow = (
	values: ITOMORROWDataValueItem,
	diel: DielEnum
): WeatherTypeEnum => {
	const { weatherCode } = values;

	let weatherType = WeatherTypeEnum.UNKNOWN;

	for (const [type, codes] of Object.entries(weatherCodeDict_tomorrow)) {
		if (codes.includes(weatherCode)) {
			weatherType = type as WeatherTypeEnum;
			break;
		}
	}
	if (diel === DielEnum.NIGHT) {
		if ([1000, 1100].includes(weatherCode)) {
			weatherType = WeatherTypeEnum.CLEAR_NIGHT;
		} else if ([1101, 1102, 1001].includes(weatherCode)) {
			weatherType = WeatherTypeEnum.CLOUDY_NIGHT;
		}
	}

	return weatherType;
};
/**
 * 從 Tomorrow.io 天氣資料判斷屬於哪種天氣類型
 * @param values Tomorrow.io 即時天氣資料
 * @param diel 晝夜
 * @returns 天氣類型
 */
export const getWeatherTypeWithoutCode_tomorrow = (
	values: ITOMORROWDataValueItem,
	diel: DielEnum
): WeatherTypeEnum => {
	const {
		cloudCover,
		dewPoint,
		humidity,
		precipitationProbability,
		rainIntensity,
		sleetIntensity,
		snowIntensity,
		temperature,
		temperatureApparent,
		visibility,
		windGust,
		windSpeed,
	} = values;

	let weatherType = WeatherTypeEnum.UNKNOWN;

	// Cloud Cover
	if (diel === DielEnum.DAY) {
		if (cloudCover <= 40) {
			weatherType = WeatherTypeEnum.CLEAR;
		} else if (cloudCover > 40 && cloudCover <= 80) {
			weatherType = WeatherTypeEnum.PARTLY_CLOUDY;
		} else {
			weatherType = WeatherTypeEnum.CLOUDY;
		}
	} else {
		if (cloudCover <= 40) {
			weatherType = WeatherTypeEnum.CLEAR_NIGHT;
		} else {
			weatherType = WeatherTypeEnum.CLOUDY_NIGHT;
		}
	}

	// 降水
	if (precipitationProbability > 50) {
		// Rain
		if (rainIntensity <= 40) {
			weatherType = WeatherTypeEnum.DRIZZLE;
		} else if (rainIntensity > 40 && rainIntensity <= 60) {
			weatherType = WeatherTypeEnum.RAIN;
		} else {
			weatherType = WeatherTypeEnum.THUNDER_STORM;
		}

		// Snow
		if (snowIntensity * 24 <= 5 && windSpeed <= 15 && visibility > 0.4) {
			weatherType = WeatherTypeEnum.SNOW;
		} else if (
			snowIntensity * 24 > 5 &&
			(windSpeed > 15 || windGust > 15) &&
			visibility <= 0.4
		) {
			weatherType = WeatherTypeEnum.BLIZZARD;
		}

		// Sleet
		if (temperature < 0 && sleetIntensity > 0) {
			weatherType = WeatherTypeEnum.SLEET;
		}
	}

	// Special Cases
	if (temperature >= dewPoint - 1 && temperature <= dewPoint + 1 && humidity > 90) {
		weatherType = WeatherTypeEnum.FOG;
	}

	if (temperatureApparent <= 10) {
		weatherType = WeatherTypeEnum.COLD;
	} else if (temperatureApparent > 36) {
		weatherType = WeatherTypeEnum.HOT;
	}

	if (windSpeed > 10.8 && windSpeed <= 13.8) {
		weatherType = WeatherTypeEnum.WINDY;
	} else if (windSpeed > 17.2) {
		weatherType = WeatherTypeEnum.HURRICANE;
	}

	return weatherType;
};
