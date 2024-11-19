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

export const getWeatherTypeWithoutCode = (
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
		temperatureApparent,
		visibility,
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

	// Rain

	return weatherType;
};
