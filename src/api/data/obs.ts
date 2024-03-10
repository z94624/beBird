import { DATAOBSGetRecentObsInRegionReq } from '@/models/data/obs';
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
        method: 'get',
        params,
    });
};
