/**
 * Unit System
 * 字典：utils/tomorrow.ts/metricUnitsDict+imperialUnitsDict
 */
export enum UnitSystemEnum {
	METRIC = 'metric', // 公制 EX: Celcius
	IMPERIAL = 'imperial', // 英制 EX: Fahrenheit
}

/**
 * Data Fields
 * https://docs.tomorrow.io/reference/data-layers-core
 */
export enum DataFieldsEnum {
	TEMP = 'temperature', // The "real" temperature measurement (at 2m)
	TEMP_APP = 'temperatureApparent', // The temperature equivalent perceived by humans, caused by the combined effects of air temperature, relative humidity, and wind speed (at 2m)
	DEW_POINT = 'dewPoint', // The temperature to which air must be cooled to become saturated with water vapor (at 2m)
	HUMIDITY = 'humidity', // The concentration of water vapor present in the air
	WIND_SPEED = 'windSpeed', // The fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature (at 10m)
	WIND_DIRECT = 'windDirection', // The direction from which it originates, measured in degrees clockwise from due north (at 10m)
	WIND_GUST = 'windGust', // The maximum brief increase in the speed of the wind, usually less than 20 seconds (at 10m)
	PRESS_SUR_LV = 'pressureSurfaceLevel', // The force exerted against a surface by the weight of the air above the surface (at the surface level)
	PRESS_SEA_LV = 'pressureSeaLevel', // The force exerted against a surface by the weight of the air above the surface (at the mean sea level)
	PRECIP_INTENSE = 'precipitationIntensity', // The measure of the intensity of precipitation by calculating the amount of precipitation that would fall over a given interval of time if the precipitation intensity were constant over that time period.
	RAIN_INTENSE = 'rainIntensity', // The measure of the intensity of rainfall by calculating the amount of rain that would fall over a given interval of time if the rain intensity were constant over that time period.
	FREEZE_RAIN_INTENSE = 'freezingRainIntensity', // The measure of the intensity of freezing rain by calculating the amount of freezing rain that would fall over a given interval of time if the freezing rain intensity were constant over that time period.
	SNOW_INTENSE = 'snowIntensity', // The measure of the intensity of snowfall by calculating the amount of snow that would fall over a given interval of time if the snow intensity were constant over that time period.
	SLEET_INTENSE = 'sleetIntensity', // The measure of the intensity of sleet (ice pellets) by calculating the amount of sleet that would fall over a given interval of time if the sleet intensity were constant over that time period.
	PRECIP_PROB = 'precipitationProbability', // Probability of precipitation represents the chance of >0.0254 cm (0.01 in.) of liquid equivalent precipitation at a radius surrounding a point location over a specific period of time.
	PRECIP_TYPE = 'precipitationType', // The various types of precipitation often include the character or phase of the precipitation which is falling to ground level (Schuur classification)
	RAIN_ACCU = 'rainAccumulation', // The accumulated amount of liquid rain that has or will accumulate for the past or future hour of the requested time
	SNOW_ACCU = 'snowAccumulation', // The accumulated amount of new snowfall that has or will accumulate for the past or future hour of the requested time
	SNOW_ACCU_LWE = 'snowAccumulationLwe', // The liquid water equivalent of accumulated amount of new snowfall that has or will accumulate for the past or future hour of the requested time
	SNOW_DEPTH = 'snowDepth', // The depth of snow on the ground including both new and old snow
	SLEET_ACCU = 'sleetAccumulation', // The accumulated amount of sleet (ice pellets) that has or will accumulate for the past or future hour of the requested time
	SLEET_ACCU_LWE = 'sleetAccumulationLwe', // The liquid water equivalent accumulated amount of sleet (ice pellets) that has or will accumulate for the past or future hour of the requested time
	ICE_ACCU = 'iceAccumulation', // The accumulated amount of ice from freezing rain that has or will accumulate for the past or future hour of the requested time
	ICE_ACCU_LWE = 'iceAccumulationLwe', // The liquid water equivalent accumulated amount of ice from freezing rain that has or will accumulate for the past or future hour of the requested time
	SUNRISE_TIME = 'sunriseTime', // The daily appearance of the Sun on the horizon due to Earth's rotation
	SUNSET_TIME = 'sunsetTime', // The daily disappearance of the Sun below the horizon due to Earth's rotation
	VISIBILITY = 'visibility', // The measure of the distance at which an object or light can be clearly discerned
	CLOUD_COVER = 'cloudCover', // The fraction of the sky obscured by clouds when observed from a particular location
	CLOUD_BASE = 'cloudBase', // The lowest altitude of the visible portion of a cloud (above ground level)
	CLOUD_CEIL = 'cloudCeiling', // The highest altitude of the visible portion of a cloud (above ground level)
	MOON_PHASE = 'moonPhase', // The shape of the directly sunlit portion of the Moon as viewed from Earth
	UV_IDX = 'uvIndex', // Standard measurement of the strength of sunburn producing UV radiation at a particular place and time.
	UV_HEALTH_CONCERN = 'uvHealthConcern', // When the predicted UV index is within these numerical ranges, the recommended need for protection is indicated by the qualitative description of the values.
	GDD_10_30 = 'gdd10To30', // Growing Degree Days calculation with a temperature base of 10°C and a temperature cap of 30°C.
	GDD_10_31 = 'gdd10To31', // Growing Degree Days calculation with a temperature base of 10°C and a temperature cap of 31°C.
	GDD_08_30 = 'gdd08To30', // Growing Degree Days calculation with a temperature base of 08°C and a temperature cap of 30°C.
	GDD_03_25 = 'gdd03To25', // Growing Degree Days calculation with a temperature base of 03°C and a temperature cap of 25°C.
	EVAPO_TRANS = 'evapotranspiration', // The combined processes by which water moves from the earth’s surface into the atmosphere.
	WEATHER_CODE_FULL_DAY = 'weatherCodeFullDay', // The text description that conveys the most prominent weather condition during the day (from sunrise till next sunrise)
	WEATHER_CODE_DAY = 'weatherCodeDay', // The text description that conveys the most prominent weather condition during the day (from sunrise till sunset)
	WEATHER_CODE_NIGHT = 'weatherCodeNight', // The text description that conveys the most prominent weather condition during the night (from sunset till sunrise)
	WEATHER_CODE = 'weatherCode', // The text description that conveys the most prominent weather condition
	THUNDER_PROB = 'thunderstormProbability', // The probability that lightning flash density exceeds 0.1 with units of (100 km^2 / hour).
	EZ_HEAT_STRESS_IDX = 'ezHeatStressIndex', // Heat stress index based on Ezra-Zohar formula.
}
