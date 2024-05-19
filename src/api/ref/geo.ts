import ebird from '@/plugins/axios';

/**
 * Adjacent Regions
 * @param regionCode The country, subnational1 or subnational2 code.
 */
export const getAdjacentRegionsApi = (regionCode: string): Promise<any> => {
	return ebird.request({
		url: `/ref/adjacent/${regionCode}`,
	});
};
