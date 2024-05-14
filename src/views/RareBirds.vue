<template>
	<Map>
		<template #search-menu>
			<q-form
				class="q-gutter-md"
				no-error-focus
				no-reset-focus
			>
				<CountrySelect v-model:country="country" />
				<RegionSelect
					v-model:region="region"
					:country="country"
				/>

				<div>
					<span>時間間隔(幾天以前)</span>
					<DaysBackSlider v-model="notableObsForm.back" />
				</div>
			</q-form>
		</template>
	</Map>
</template>

<script lang="ts" setup>
	import { onBeforeMount, ref, watch } from 'vue';

	import { getRecentNotableObsInRegionApi } from '@/api/data/obs';
	import {
		DATAOBSGetRecentNotableObsInRegionReq,
		IDATAOBSGetRecentNotableObsInRegionItem,
	} from '@/models/data/obs';

	import { useDebounceFn } from '@vueuse/core';
	import { GeoDataEnum } from '@/models/enum/geoEnum';

	const country = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	const region = ref<string>();
	const notableObsForm = ref(new DATAOBSGetRecentNotableObsInRegionReq());

	watch(
		[country, region, notableObsForm],
		() => {
			debouncedGetNotableObs();
		},
		{ deep: true }
	);

	/**
	 * 取得近期稀有鳥紀錄
	 */
	const getRecentNotableObsInRegionInfo = () => {
		getRecentNotableObsInRegionApi(region.value || country.value, notableObsForm.value)
			.then((data: IDATAOBSGetRecentNotableObsInRegionItem[]) => {
				console.log(data);
			})
			.catch(() => {})
			.finally(() => {});
	};
	// 防抖
	const debouncedGetNotableObs = useDebounceFn(() => {
		getRecentNotableObsInRegionInfo();
	}, 1000);

	onBeforeMount(() => {
		getRecentNotableObsInRegionInfo();
	});
</script>

<style lang="scss" scoped></style>
