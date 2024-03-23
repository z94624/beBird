import { RegionTypeEnum } from '@/models/enum/ebirdEnum';
import { REFREGIONGetRegionInfoReq, REFREGIONGetSubRegionListReq } from '@/models/ref/region';
import { ebird } from '@/utils/http/axios';

/**
 * Region Info
 * @param regionCode The major region, country, subnational1 or subnational2 code, or locId
 * @param params Query parameters
 */
export const getRegionInfoApi = (regionCode: string, params: REFREGIONGetRegionInfoReq) => {
    return ebird.request({
        url: `/ref/region/info/${regionCode}`,
        params,
    });
};

/**
 * Sub Region List
 * @param regionType The region type: 'country', 'subnational1' or 'subnational2'.
 * @param parentRegionCode The country or subnational1 code, or 'world'.
 * @param params Query parameters
 */
export const getSubRegionListApi = (
    regionType: RegionTypeEnum,
    parentRegionCode: string | 'world',
    params: REFREGIONGetSubRegionListReq,
) => {
    return ebird.request({
        url: `/ref/region/list/${regionType}/${parentRegionCode}`,
        params,
    });
};
