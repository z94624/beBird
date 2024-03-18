import {
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
    const { lat, lng } = params;
    return ebird.request({
        url: `/data/obs/geo/recent?lat=${lat}&lng=${lng}`,
        params,
    });
};
