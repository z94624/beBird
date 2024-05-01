import { defineStore } from 'pinia';
import { allCountries } from 'country-region-data';
import { QSelectOption } from 'quasar';

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

	// 取得地區選項
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

	return {
		countryOptions,
		getRegionOptions,
	};
});
