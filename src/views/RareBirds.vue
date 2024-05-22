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
				v-for="(obs, oIdx) in pureObsList"
				:key="oIdx"
				:lat-lng="[obs.lat, obs.lng]"
			>
				<l-icon
					:icon-anchor="[7, 35]"
					:icon-size="[14, 35]"
					:icon-url="TWT"
				/>
			</l-marker>
		</template>
	</Map>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';
	import { LMarker, LIcon } from '@vue-leaflet/vue-leaflet';

	import TWT from '@/assets/images/twt.svg';

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

	// 不重複座標清單
	const pureObsList = computed(() => {
		let pureList: IDATAOBSGetRecentNotableObsInRegionItem[] = [];
		notableObsList.value.forEach((item) => {
			let exist = pureList.find(
				(pureItem) => pureItem.lat === item.lat && pureItem.lng === item.lng
			);
			if (!exist) {
				pureList.push(item);
			}
		});
		return pureList;
	});

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
