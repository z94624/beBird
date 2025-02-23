/**
 * 天氣項目
 */
export enum WeatherItemEnum {
	SUNRISE = 'sunrise',
	SUNSET = 'sunset',
	TEMP = 'temperature',
	PRECIP = 'precipitation',
	HUMID = 'humidity',
	WIND_SPEED = 'wind_speed',
	C = 'celsius',
	F = 'fahrenheit',
	OBS_TIME = 'observation_time',
}

/**
 * 天氣類型
 */
export enum WeatherTypeEnum {
	UNKNOWN = 'unknown',
	BLIZZARD = 'blizzard',
	CLEAR = 'clear',
	CLEAR_NIGHT = 'clear_night',
	CLOUDY = 'cloudy',
	CLOUDY_NIGHT = 'cloudy_night',
	COLD = 'cold',
	DRIZZLE = 'drizzle',
	FOG = 'fog',
	HOT = 'hot',
	HURRICANE = 'hurricane',
	PARTLY_CLOUDY = 'partly_cloudy',
	RAIN = 'rain',
	SLEET = 'sleet',
	SNOW = 'snow',
	THUNDER_STORM = 'thunderstorm',
	WINDY = 'windy',
}

/**
 * 晝夜
 */
export enum DielEnum {
	DAY = 'day', // 日
	NIGHT = 'night', // 夜
}
