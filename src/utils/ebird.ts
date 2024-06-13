import { date } from 'quasar';
import { convertDDToDMS } from './convert';

/**
 * 取得紀錄距現在相隔天數
 * @param obsDt eBird 紀錄時間格式字串
 * @returns 距離現在的天數
 */
export const getDateDiffFromNow = (obsDt: string): number => {
	const obsDate = date.extractDate(obsDt, 'YYYY-MM-DD HH:mm');
	const diff = date.getDateDiff(new Date(), obsDate, 'days');
	return diff;
};

/**
 * 取得 Google Maps 的地點 URL
 * @param lat eBird 緯度
 * @param lng eBird 經度
 * @returns Google Maps Place URL 字串
 */
export const getGoogleMapsPlaceURL = (lat: number, lng: number): string => {
	const baseURL = 'https://www.google.com/maps/place';

	const { d: latD, m: latM, s: latS } = convertDDToDMS(lat);
	const { d: lngD, m: lngM, s: lngS } = convertDDToDMS(lng);
	const lat_lng = `/${Math.abs(latD)}%C2%B0${latM}'${latS}%22${latD ? 'N' : 'S'}+${Math.abs(lngD)}%C2%B0${lngM}'${lngS}%22${lngD ? 'E' : 'W'}`;

	return baseURL + lat_lng;
};
