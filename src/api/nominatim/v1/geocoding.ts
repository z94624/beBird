// https://nominatim.org/release-docs/develop/api/Overview/

import {
	INOMINATIMSearchRes,
	NOMINATIMSearchFreeformReq,
	NOMINATIMSearchStructuredReq,
} from '@/models/nominatim/v1/geocoding';
import { nominatim } from '@/plugins/axios';

/**
 * Search queries
 * search OSM objects by name or type
 */
export const searchApi = (params: NOMINATIMSearchFreeformReq | NOMINATIMSearchStructuredReq) =>
	nominatim.get<INOMINATIMSearchRes>('/search', { params });
