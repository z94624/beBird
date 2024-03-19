import {
    DATAOBSGetHistoricObsOnDateReq,
    DATAOBSGetNearestObsOfSpeciesReq,
    DATAOBSGetRecentChecklistsFeedReq,
    DATAOBSGetRecentNearbyNotableObsReq,
    DATAOBSGetRecentNearbyObsOfSpeciesReq,
    DATAOBSGetRecentNearbyObsReq,
    DATAOBSGetRecentNotableObsInRegionReq,
    DATAOBSGetRecentObsInRegionReq,
    DATAOBSGetRecentObsOfSpeciesInRegionReq,
} from '@/models/data/obs';
import { ebird } from '@/utils/http/axios';

/**
 * Recent observations in a region
 * @param regionCode The country, subnational1, subnational2 or location code.
 * @param params Query parameters
 */
export const getRecentObsInRegionApi = (
    regionCode: string,
    params: DATAOBSGetRecentObsInRegionReq,
) => {
    return ebird.request({
        url: `/data/obs/${regionCode}/recent`,
        params,
    });
};

/**
 * Recent notable observations in a region
 * @param regionCode The country, subnational1, subnational2 or location code.
 * @param params Query parameters
 */
export const getRecentNotableObsInRegionApi = (
    regionCode: string,
    params: DATAOBSGetRecentNotableObsInRegionReq,
) => {
    return ebird.request({
        url: `/data/obs/${regionCode}/recent/notable`,
        params,
    });
};

/**
 * Recent observations of a species in a region
 * @param regionCode The country, subnational1, subnational2 or location code.
 * @param speciesCode The eBird species code.
 * @param params Query parameters
 */
export const getRecentObsOfSpeciesInRegionApi = (
    regionCode: string,
    speciesCode: string,
    params: DATAOBSGetRecentObsOfSpeciesInRegionReq,
) => {
    return ebird.request({
        url: `/data/obs/${regionCode}/recent/${speciesCode}`,
        params,
    });
};

/**
 * Recent nearby observations
 * @param coordinates 座標 DTO
 * @param params Query parameters
 */
export const getRecentNearbyObsApi = (params: DATAOBSGetRecentNearbyObsReq) => {
    return ebird.request({
        url: `/data/obs/geo/recent`,
        params,
    });
};

/**
 * Recent nearby observations of a species
 * @param speciesCode The eBird species code.
 * @param params Query parameters
 */
export const getRecentNearbyObsOfSpeciesApi = (
    speciesCode: string,
    params: DATAOBSGetRecentNearbyObsOfSpeciesReq,
) => {
    return ebird.request({
        url: `/data/obs/geo/recent/${speciesCode}`,
        params,
    });
};

/**
 * Nearest observations of a species
 * @param speciesCode The eBird species code.
 * @param params Query parameters
 */
export const getNearestObsOfSpeciesApi = (
    speciesCode: string,
    params: DATAOBSGetNearestObsOfSpeciesReq,
) => {
    return ebird.request({
        url: `/data/nearest/geo/recent/${speciesCode}`,
        params,
    });
};

/**
 * Recent nearby notable observations
 * @param params Query parameters
 */
export const getRecentNearbyNotableObsApi = (params: DATAOBSGetRecentNearbyNotableObsReq) => {
    return ebird.request({
        url: `/data/obs/geo/recent/notable`,
        params,
    });
};

/**
 * Recent checklists feed
 * @param regionCode The country, subnational1, subnational2 or location code.
 * @param params Query parameters
 */
export const getRecentChecklistsFeedApi = (
    regionCode: string,
    params: DATAOBSGetRecentChecklistsFeedReq,
) => {
    return ebird.request({
        url: `/product/lists/${regionCode}`,
        params,
    });
};

/**
 * Historic observations on a date
 * @param regionCode The country, subnational1, subnational2 or location code.
 * @param year The year, from 1800 to the present.
 * @param month The month, from 1 -12.
 * @param day The day in the month.
 * @param params Query parameters
 */
export const getHistoricObsOnDateApi = (
    regionCode: string,
    year: string,
    month: string,
    day: string,
    params: DATAOBSGetHistoricObsOnDateReq,
) => {
    return ebird.request({
        url: `/data/obs/${regionCode}/historic/${year}/${month}/${day}`,
        params,
    });
};
