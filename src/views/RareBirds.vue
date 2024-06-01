<template>
	<VlMap>
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
					@loading="(status: boolean) => (loading = status)"
				/>

				<div>
					<span>時間間隔(幾天以前)</span>
					<DaysBackSlider v-model="notableObsForm.back" />
				</div>
			</q-form>

			<SubLoading :show="loading" />
		</template>

		<template #markers>
			<l-marker
				v-for="(obs, oIdx) in pureObsList"
				:key="oIdx"
				:lat-lng="[obs.lat, obs.lng]"
				@ready="(e) => console.log(e)"
			>
				<VlIcon />

				<VlTooltip permanent>
					{{ userComNameDict[obs.speciesCode] ?? obs.comName }}
				</VlTooltip>
			</l-marker>
		</template>
	</VlMap>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, toRefs, watch } from 'vue';
	import { useDebounceFn } from '@vueuse/core';
	import { LMarker } from '@vue-leaflet/vue-leaflet';

	import { getRecentNotableObsInRegionApi } from '@/api/data/obs';
	import {
		DATAOBSGetRecentNotableObsInRegionReq,
		IDATAOBSGetRecentNotableObsInRegionItem,
	} from '@/models/data/obs';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { usePreferredLanguageStore } from '@/store/modules/language';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { LocaleEnum } from '@/models/enum/ebirdEnum';
	import { IMap } from '@/models/common/base';

	const { $notify, $loading } = useQuasarTool();
	const preferredLanguageStore = usePreferredLanguageStore();
	const { userLangCode } = toRefs(preferredLanguageStore);
	const taxonomyStore = useTaxonomyStore();

	const loading = ref(false);
	const country = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	const region = ref<string | null>(null);
	const notableObsForm = ref(new DATAOBSGetRecentNotableObsInRegionReq());
	const notableObsList = ref<IDATAOBSGetRecentNotableObsInRegionItem[]>([]);
	const userComNameDict = ref<IMap<string>>({});

	// 不重複座標清單
	const pureObsList = computed(() => {
		let pureList: IDATAOBSGetRecentNotableObsInRegionItem[] = [];
		notableObsList.value.forEach((obs) => {
			let exist = pureList.find(
				(pureItem) => pureItem.lat === obs.lat && pureItem.lng === obs.lng
			);
			if (!exist) {
				pureList.push(obs);
			}
		});
		return pureList;
	});
	// 不重複物種代碼列表
	const pureSpeciesCodes = computed(() => pureObsList.value.map((obs) => obs.speciesCode));

	watch(
		[country, region, notableObsForm],
		() => {
			debouncedGetNotableObs();
		},
		{ deep: true }
	);

	/**
	 * 根據使用者語系，建立物種代碼對當地俗名字典
	 */
	watch(pureSpeciesCodes, (nv) => {
		$loading.on();
		if (!nv.length) return;
		taxonomyStore
			.getEbirdTaxonomyInfo(userLangCode.value as LocaleEnum, nv.join(','))
			.then((data) => {
				$notify.success('成功：取得物種資訊');
				console.log('speciesTaxonomies', data);
				data.forEach((tax) => {
					userComNameDict.value[tax.speciesCode] = tax.comName;
				});
			})
			.catch(() => {
				$notify.error('失敗：取得物種資訊');
			})
			.finally(() => {
				$loading.off();
			});
	});

	/**
	 * 取得近期稀有鳥紀錄
	 */
	const getRecentNotableObsInRegionInfo = () => {
		$loading.on();
		getRecentNotableObsInRegionApi(region.value || country.value, notableObsForm.value)
			.then((data: IDATAOBSGetRecentNotableObsInRegionItem[]) => {
				$notify.success('成功：取得近期稀有鳥紀錄');
				console.log('notableObsList', data);
				notableObsList.value = data;
			})
			.catch(() => {
				$notify.error('失敗：取得近期稀有鳥紀錄');
			})
			.finally(() => {
				$loading.off();
			});
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
