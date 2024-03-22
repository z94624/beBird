import {
    REFHOTSPOTGetHotspotsInRegionReq,
    REFHOTSPOTGetNearbyHotspotsReq,
} from '@/models/ref/hotspot';
import { ebird } from '@/utils/http/axios';

/**
 * Hotspots in a region
 * @param regionCode The country, subnational1 or subnational2 code.
 * @param params Query parameters
 */
export const getHotspotsInRegionApi = (
    regionCode: string,
    params: REFHOTSPOTGetHotspotsInRegionReq,
) => {
    return ebird.request({
        url: `/ref/hotspot/${regionCode}`,
        params,
    });
};

/**
 * Nearby hotspots
 * @param params Query parameters
 */
export const getNearbyHotspotsApi = (params: REFHOTSPOTGetNearbyHotspotsReq) => {
    return ebird.request({
        url: '/ref/hotspot/geo',
        params,
    });
};

/**
 * Hotspot Info
 * @param locId The location code.
 */
export const getHotspotInfoApi = (locId: string) => {
    return ebird.request({
        url: `/ref/hotspot/info/${locId}`,
    });
};
