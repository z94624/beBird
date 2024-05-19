import {
	REFHOTSPOTGetHotspotsInRegionReq,
	REFHOTSPOTGetNearbyHotspotsReq,
} from '@/models/ref/hotspot';
import ebird from '@/plugins/axios';

/**
 * Hotspots in a region
 * @param regionCode The country, subnational1 or subnational2 code.
 * @param params Query parameters
 */
export const getHotspotsInRegionApi = (
	regionCode: string,
	params: REFHOTSPOTGetHotspotsInRegionReq
): Promise<any> => {
	return ebird.request({
		url: `/ref/hotspot/${regionCode}`,
		params,
	});
};

/**
 * Nearby hotspots
 * @param params Query parameters
 */
export const getNearbyHotspotsApi = (params: REFHOTSPOTGetNearbyHotspotsReq): Promise<any> => {
	return ebird.request({
		url: '/ref/hotspot/geo',
		params,
	});
};

/**
 * Hotspot Info
 * @param locId The location code.
 */
export const getHotspotInfoApi = (locId: string): Promise<any> => {
	return ebird.request({
		url: `/ref/hotspot/info/${locId}`,
	});
};
