import { defineStore } from 'pinia';

import { reverseApi } from '@/api/nominatim/v1/geocoding';
import { NOMINATIMReverseReq } from '@/models/nominatim/v1/geocoding';

export const useGeocodingStore = defineStore('geocoding', () => {
	/**
	 * Reverse queries
	 * reverse geocoding generates an address from a latitude and longitude
	 */
	const nominatimReverse = (req: NOMINATIMReverseReq) => {
		// $loading.on();
		return reverseApi(req)
			.then((res) => {
				return Promise.resolve(res);
			})
			.catch((_msg) => {
				return Promise.reject(_msg);
			})
			.finally(() => {
				// $loading.off();
			});
	};

	return {
		nominatimReverse,
	};
});
