// https://nominatim.org/release-docs/develop/api/Overview/

import {
	INOMINATIMSearchRes,
	NOMINATIMSearchFreeformReq,
	NOMINATIMSearchStructuredReq,
	INOMINATIMReverseRes,
	NOMINATIMReverseReq,
	INOMINATIMLookupRes,
	NOMINATIMLookupReq,
	INOMINATIMStatusRes,
	NOMINATIMStatusReq,
	INOMINATIMDetailsRes,
	NOMINATIMDetailsReq,
} from '@/models/nominatim/v1/geocoding';
import { nominatim } from '@/plugins/axios';

/**
 * Search queries
 * search OSM objects by name or type
 */
export const searchApi = (params: NOMINATIMSearchFreeformReq | NOMINATIMSearchStructuredReq) =>
	nominatim.get<INOMINATIMSearchRes>('/search', { params });

/**
 * Reverse queries
 * reverse geocoding generates an address from a latitude and longitude
 */
export const reverseApi = (params: NOMINATIMReverseReq) =>
	nominatim.get<INOMINATIMReverseRes>('/reverse', { params });

/**
 * Lookup queries
 * look up the address and other details of one or multiple OSM objects like node, way or relation
 */
export const lookupApi = (params: NOMINATIMLookupReq) =>
	nominatim.get<INOMINATIMLookupRes>('/lookup', { params });

/**
 * Status queries
 * check if the API is up and functioning
 */
export const statusApi = (params?: NOMINATIMStatusReq) =>
	nominatim.get<INOMINATIMStatusRes>('/status', { params });

/**
 * Details queries
 * show all details about a single place
 */
export const detailsApi = (params: NOMINATIMDetailsReq) =>
	nominatim.get<INOMINATIMDetailsRes>('/details', { params });
