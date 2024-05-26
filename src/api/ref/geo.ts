import ebird from '@/plugins/axios';

/**
 * Adjacent Regions
 * @param regionCode The country, subnational1 or subnational2 code.
 */
export const getAdjacentRegionsApi = (regionCode: string) => {
	return ebird.get(`/ref/adjacent/${regionCode}`);
};
