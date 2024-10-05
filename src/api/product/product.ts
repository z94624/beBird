import {
	IPRODUCTGetViewChecklistRes,
	PRODUCTGetChecklistFeedOnDateReq,
	PRODUCTGetTop100Req,
} from '@/models/product/product';
import { ebird } from '@/plugins/axios';

/**
 * Top 100
 * @param regionCode The country, subnational1, or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 * @param params Query parameters
 */
export const getTop100Api = (
	regionCode: string,
	year: string,
	month: string,
	day: string,
	params: PRODUCTGetTop100Req
) => {
	return ebird.get(`/product/top100/${regionCode}/${year}/${month}/${day}`, { params });
};

/**
 * Checklist feed on a date
 * @param regionCode The country, subnational1, or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 * @param params Query parameters
 */
export const getChecklistFeedOnDateApi = (
	regionCode: string,
	year: string,
	month: string,
	day: string,
	params: PRODUCTGetChecklistFeedOnDateReq
) => {
	return ebird.get(`/product/lists/${regionCode}/${year}/${month}/${day}`, { params });
};

/**
 * Regional statistics on a date
 * @param regionCode The country, subnational1, or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 * @param params Query parameters
 */
export const getRegionalStatisticsOnDateApi = (
	regionCode: string,
	year: string,
	month: string,
	day: string
) => {
	return ebird.get(`/product/stats/${regionCode}/${year}/${month}/${day}`);
};

/**
 * Species List for a Region
 * @param regionCode The country, subnational1, or location code.
 */
export const getSpeciesListForRegionApi = (regionCode: string) => {
	return ebird.get(`product/spplist/${regionCode}`);
};

/**
 * View Checklist
 * @param subId The checklist identifier.
 */
export const getViewChecklistApi = (subId: string) => {
	return ebird.get<IPRODUCTGetViewChecklistRes>(`/product/checklist/view/${subId}`);
};
