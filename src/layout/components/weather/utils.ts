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
import SunriseVideo from '@assets/icons/weather/items/sunrise.mp4';
import SunsetVideo from '@assets/icons/weather/items/sunset.mp4';
import TempVideo from '@assets/icons/weather/items/temperature.mp4';
import PrecipVideo from '@assets/icons/weather/items/precipitation.mp4';
import HumidVideo from '@assets/icons/weather/items/humidity.mp4';
import WindSpeedVideo from '@assets/icons/weather/items/wind_speed.mp4';
import CelsiusVideo from '@assets/icons/weather/items/celsius.mp4';
import FahrenheitVideo from '@assets/icons/weather/items/fahrenheit.mp4';
import ObsTimeVideo from '@assets/icons/weather/items/observation_time.mp4';

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
import SunriseImg from '@assets/icons/weather/items/sunrise.png';
import SunsetImg from '@assets/icons/weather/items/sunset.png';
import TempImg from '@assets/icons/weather/items/temperature.png';
import PrecipImg from '@assets/icons/weather/items/precipitation.png';
import HumidImg from '@assets/icons/weather/items/humidity.png';
import WindSpeedImg from '@assets/icons/weather/items/wind_speed.png';
import CelsiusImg from '@assets/icons/weather/items/celsius.png';
import FahrenheitImg from '@assets/icons/weather/items/fahrenheit.png';
import ObsTimeImg from '@assets/icons/weather/items/observation_time.png';

import { IMap } from '@/models/common/base';
import { DielEnum, WeatherItemEnum, WeatherTypeEnum } from '@/models/enum/weatherEnum';
import { ITOMORROWDataValueItem } from '@/models/tomorrow/v4/weather';

/**
 * 天氣圖示對應表
 */
export const weatherDataDict: IMap<{
	desc: string; // 文字說明
	videoUrl: string; // 影片來源 URL
	video: string; // 影片檔案路徑
	image: string; // 圖片檔案路徑
	code_tomorrow?: number[]; // Tomorrow.io 天氣代碼；https://docs.tomorrow.io/reference/data-layers-weather-codes
}> = {
	[WeatherTypeEnum.UNKNOWN]: {
		desc: 'Weather(天氣)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/14464/14464176.mp4',
		video: WeatherVideo,
		image: WeatherImg,
		code_tomorrow: [0],
	},

	[WeatherTypeEnum.CLEAR]: {
		desc: 'Sunny(晴天)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102813.mp4',
		video: ClearVideo,
		image: ClearImg,
		code_tomorrow: [1000, 1100],
	},
	[WeatherTypeEnum.PARTLY_CLOUDY]: {
		desc: 'Partly Cloudy(晴時多雲)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102931.mp4',
		video: PartlyCloudyVideo,
		image: PartlyCloudyImg,
		code_tomorrow: [1101],
	},
	[WeatherTypeEnum.CLOUDY]: {
		desc: 'Cloudy(多雲時陰)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102874.mp4',
		video: CloudyVideo,
		image: CloudyImg,
		code_tomorrow: [1102, 1001],
	},

	[WeatherTypeEnum.CLEAR_NIGHT]: {
		desc: 'Clear Night(晴夜)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102940.mp4',
		video: ClearNightVideo,
		image: ClearNightImg,
		code_tomorrow: [1000, 1100],
	},
	[WeatherTypeEnum.CLOUDY_NIGHT]: {
		desc: 'Cloudy Night(陰夜)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102854.mp4',
		video: CloudyNightVideo,
		image: CloudyNightImg,
		code_tomorrow: [1101, 1102, 1001],
	},

	[WeatherTypeEnum.DRIZZLE]: {
		desc: 'Drizzle(細雨)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102975.mp4',
		video: DrizzleVideo,
		image: DrizzleImg,
		code_tomorrow: [4000],
	},
	[WeatherTypeEnum.RAIN]: {
		desc: 'Rainy(雨天)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102963.mp4',
		video: RainVideo,
		image: RainImg,
		code_tomorrow: [4001, 4200, 4201],
	},
	[WeatherTypeEnum.THUNDER_STORM]: {
		desc: 'Thunder Storm(暴風雨)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17858/17858208.mp4',
		video: ThunderStormVideo,
		image: ThunderStormImg,
		code_tomorrow: [8000],
	},

	[WeatherTypeEnum.SNOW]: {
		desc: 'Snowy(降雪)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17103/17103024.mp4',
		video: SnowVideo,
		image: SnowImg,
		code_tomorrow: [5000, 5001, 5100],
	},
	[WeatherTypeEnum.SLEET]: {
		desc: 'Sleet(冰霰)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17858/17858185.mp4',
		video: SleetVideo,
		image: SleetImg,
		code_tomorrow: [6000, 6001, 6200, 6201, 7000, 7101, 7102],
	},
	[WeatherTypeEnum.BLIZZARD]: {
		desc: 'Blizzard(暴風雪)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17484/17484878.mp4',
		video: BlizzardVideo,
		image: BlizzardImg,
		code_tomorrow: [5101],
	},

	[WeatherTypeEnum.FOG]: {
		desc: 'Foggy(多霧)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102868.mp4',
		video: FogVideo,
		image: FogImg,
		code_tomorrow: [2000, 2100],
	},

	[WeatherTypeEnum.COLD]: {
		desc: 'Cold(冷)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17103/17103071.mp4',
		video: ColdVideo,
		image: ColdImg,
	},
	[WeatherTypeEnum.HOT]: {
		desc: 'Hot(熱)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17103/17103056.mp4',
		video: HotVideo,
		image: HotImg,
	},

	[WeatherItemEnum.SUNRISE]: {
		desc: 'Sunrise(日昇)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/14204/14204927.mp4',
		video: SunriseVideo,
		image: SunriseImg,
	},
	[WeatherItemEnum.SUNSET]: {
		desc: 'Sunset(日落)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/11779/11779599.mp4',
		video: SunsetVideo,
		image: SunsetImg,
	},
	[WeatherItemEnum.TEMP]: {
		desc: 'Temperature[Apparent](氣溫[體感])',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/15968/15968679.mp4',
		video: TempVideo,
		image: TempImg,
	},
	[WeatherItemEnum.PRECIP]: {
		desc: 'Precipitation Probability(降水機率)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102917.mp4',
		video: PrecipVideo,
		image: PrecipImg,
	},
	[WeatherItemEnum.HUMID]: {
		desc: 'Humidity(濕度)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/11201/11201779.mp4',
		video: HumidVideo,
		image: HumidImg,
	},
	[WeatherItemEnum.WIND_SPEED]: {
		desc: 'Wind Speed(風速)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/12277/12277857.mp4',
		video: WindSpeedVideo,
		image: WindSpeedImg,
	},
	[WeatherItemEnum.C]: {
		desc: 'Metric Unit(公制)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102847.mp4',
		video: CelsiusVideo,
		image: CelsiusImg,
	},
	[WeatherItemEnum.F]: {
		desc: 'Imperial Unit(英制)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/17102/17102882.mp4',
		video: FahrenheitVideo,
		image: FahrenheitImg,
	},
	[WeatherItemEnum.OBS_TIME]: {
		desc: 'Observation Time(觀測時間)',
		videoUrl: 'https://cdn-icons-mp4.flaticon.com/512/12320/12320221.mp4',
		video: ObsTimeVideo,
		image: ObsTimeImg,
	},
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

	for (const [type, data] of Object.entries(weatherDataDict)) {
		if (data['code_tomorrow']?.includes(weatherCode)) {
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
