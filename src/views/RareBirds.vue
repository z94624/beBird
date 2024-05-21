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

		<template #markers>
			<l-marker
				v-for="(obs, oIdx) in notableObsList"
				:key="oIdx"
				:lat-lng="[obs.lat, obs.lng]"
			>
			</l-marker>
		</template>
	</Map>
</template>

<script lang="ts" setup>
	import { onBeforeMount, ref, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';
	import { LMarker } from '@vue-leaflet/vue-leaflet';

	import { getRecentNotableObsInRegionApi } from '@/api/data/obs';
	import {
		DATAOBSGetRecentNotableObsInRegionReq,
		IDATAOBSGetRecentNotableObsInRegionItem,
	} from '@/models/data/obs';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { GeoDataEnum } from '@/models/enum/geoEnum';

	const { $notify } = useQuasarTool();

	const country = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	const region = ref<string>();
	const notableObsForm = ref(new DATAOBSGetRecentNotableObsInRegionReq());
	const notableObsList = ref<IDATAOBSGetRecentNotableObsInRegionItem[]>([]);

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
				$notify.success('成功：取得近期稀有鳥紀錄');
				console.log('notableObsList', data);
				notableObsList.value = data;
			})
			.catch(() => {
				$notify.error('失敗：取得近期稀有鳥紀錄');
			})
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
