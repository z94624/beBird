import { PRODUCTGetChecklistFeedOnDateReq, PRODUCTGetTop100Req } from '@/models/product/product';
import { ebird } from '@/utils/http/axios';

/**
 * Top 100
 * @param regionCode The country, subnational1, or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 */
export const getTop100Api = (
    regionCode: string,
    year: string,
    month: string,
    day: string,
    params: PRODUCTGetTop100Req,
) => {
    return ebird.request({
        url: `/product/top100/${regionCode}/${year}/${month}/${day}`,
        params,
    });
};

/**
 * Checklist feed on a date
 * @param regionCode The country, subnational1, or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 */
export const getChecklistFeedOnDateApi = (
    regionCode: string,
    year: string,
    month: string,
    day: string,
    params: PRODUCTGetChecklistFeedOnDateReq,
) => {
    return ebird.request({
        url: `/product/lists/${regionCode}/${year}/${month}/${day}`,
        params,
    });
};
