import { ebird } from '@/utils/http/axios';

/**
 * Adjacent Regions
 * @param regionCode The country, subnational1 or subnational2 code.
 */
export const getAdjacentRegionsApi = (regionCode: string) => {
    return ebird.request({
        url: `/ref/adjacent/${regionCode}`,
    });
};
