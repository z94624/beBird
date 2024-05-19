import { defineStore } from 'pinia';
import { QSelectOption } from 'quasar';
import { allCountries } from 'country-region-data';

import { getSubRegionListApi } from '@/api/ref/region';
import { REFREGIONGetSubRegionListReq } from '@/models/ref/region';

import { RegionTypeEnum } from '@/models/enum/ebirdEnum';

/**
 * 國家地區相關
 */
export const useCountryRegionStore = defineStore('countryRegion', () => {
	// 國家選項
	const countryOptions = allCountries.reduce((arr, country) => {
		return [
			...arr,
			{
				label: country[0],
				value: country[1],
			},
		];
	}, [] as QSelectOption[]);

	/**
	 * country-region-data 版本
	 * 取得地區選項
	 * @param countryCode 國家代碼
	 * @returns 地區選項
	 */
	const getRegionOptions = (countryCode: string = 'TW'): QSelectOption[] => {
		return allCountries
			.find((country) => country[1] === countryCode)![2]
			.reduce((arr, region) => {
				return [
					...arr,
					{
						label: region[0],
						value: region[1],
					},
				];
			}, [] as QSelectOption[]);
	};
	/**
	 * eBird API 版本
	 * 取得地區資訊
	 * @param regionType 地區層級
	 * @param parentRegionCode 父層級代碼
	 * @returns 地區資訊
	 */
	const getSubRegionListInfo = async (
		regionType: RegionTypeEnum,
		parentRegionCode: string | 'world'
	) => {
		return getSubRegionListApi(regionType, parentRegionCode, new REFREGIONGetSubRegionListReq())
			.then((data) => {
				return Promise.resolve(data);
			})
			.catch((msg) => {
				return Promise.reject(msg);
			});
	};

	return {
		countryOptions,
		getRegionOptions,
		getSubRegionListInfo,
	};
});
