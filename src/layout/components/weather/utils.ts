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

import { IMap } from '@/models/common/base';
import { DielEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';
import { ITOMORROWDataValueItem } from '@/models/tomorrow/v4/weather';

/**
 * 天氣影片圖示對應檔案路徑
 */
export const weatherVideoDict: IMap<string> = {
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
