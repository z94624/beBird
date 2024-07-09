<template>
	<VlMap ref="mapRef">
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
				@click="onClickMarker"
			>
				<VlIcon />

				<VlTooltip permanent>
					{{ taxInfoDict[obs.speciesCode]?.comName ?? obs.comName }}
				</VlTooltip>

				<VlPopup
					:navigation-url="getGoogleMapsPlaceURL(obs.lat, obs.lng)"
					@detail="onOpenRbMarkerDetailDialog(obs)"
				>
					<template #location>
						{{ obs.locName }}
					</template>

					<template #content>
						<HrefButton :href="`https://ebird.org/species/${obs.speciesCode}`">
							<q-badge
								:label="`×${obs.howMany}`"
								color="warning"
								floating
								rounded
							/>

							<q-tooltip anchor="top middle">{{ obs.comName }}</q-tooltip>

							<div class="flex justify-center items-baseline gap-1">
								<div class="comName-font">
									{{ taxInfoDict[obs.speciesCode]?.comName ?? obs.comName }}
								</div>
								<div class="sciName-font">
									{{ obs.sciName }}
								</div>
							</div>
						</HrefButton>
					</template>

					<template #remark>
						<div class="flex justify-between">
							<div>{{ obs.obsDt }}</div>
							<div>{{ getDateDiffStr(obs.obsDt) }}</div>
						</div>
					</template>
				</VlPopup>
			</l-marker>
		</template>
	</VlMap>

	<RbMarkerDetailDialog ref="rbMarkerDetailDialogRef" />
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
	import { IREFTAXGetEbirdTaxonomyRes } from '@/models/ref/taxonomy';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { usePreferredLanguageStore } from '@/store/modules/language';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { LocaleEnum } from '@/models/enum/ebirdEnum';
	import { IMap } from '@/models/common/base';
	import { MarkerClickEvent } from '@/components/common/leaflet/types';
	import { getDateDiffFromNow, getGoogleMapsPlaceURL } from '@/utils/ebird';

	const { $notify, $loading } = useQuasarTool();
	const preferredLanguageStore = usePreferredLanguageStore();
	const { userLangCode } = toRefs(preferredLanguageStore);
	const taxonomyStore = useTaxonomyStore();

	const loading = ref(false);
	const country = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	const region = ref<string | null>(null);
	const notableObsForm = ref(new DATAOBSGetRecentNotableObsInRegionReq());
	const notableObsList = ref<IDATAOBSGetRecentNotableObsInRegionItem[]>([]);
	const taxInfoDict = ref<IMap<IREFTAXGetEbirdTaxonomyRes>>({});

	const mapRef = ref();
	const rbMarkerDetailDialogRef = ref();

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
		if (!nv.length) return;
		taxonomyStore
			.getEbirdTaxonomyInfo(userLangCode.value as LocaleEnum, nv.join(','))
			.then((data) => {
				// console.log('speciesTaxonomies', data);
				data &&
					data.forEach((tax) => {
						taxInfoDict.value[tax.speciesCode] = tax;
					});
			});
	});

	/**
	 * 取得近期稀有鳥紀錄
	 */
	const getRecentNotableObsInRegionInfo = () => {
		$loading.on();
		getRecentNotableObsInRegionApi(region.value || country.value, notableObsForm.value)
			.then((data) => {
				// $notify.success('成功：取得近期稀有鳥紀錄');
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

	/**
	 * 選擇圖釘
	 */
	const onClickMarker = (e: MarkerClickEvent) => {
		// console.log('clickMarkerEvent', e);
		const { latlng } = e;
		// 圖釘置中
		mapRef.value.updateCenter([latlng.lat, latlng.lng]);
	};

	/**
	 * 取得相隔天數字串
	 */
	const getDateDiffStr = (obsDt: string): string => {
		const days = getDateDiffFromNow(obsDt);
		return days ? `${days} 天前` : '今天';
	};

	/**
	 * 開啟細節跳窗
	 */
	const onOpenRbMarkerDetailDialog = (obs: IDATAOBSGetRecentNotableObsInRegionItem) => {
		rbMarkerDetailDialogRef.value.open(obs, taxInfoDict.value);
	};

	onBeforeMount(() => {
		getRecentNotableObsInRegionInfo();
	});
</script>

<style lang="scss" scoped></style>
