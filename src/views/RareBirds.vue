<template>
	<VlMap
		ref="mapRef"
		:markers-number="pureObsList.length"
		@research="getRecentNotableObsInRegionInfo"
	>
		<template #search-menu>
			<q-form
				class="q-gutter-md"
				no-error-focus
				no-reset-focus
			>
				<CountrySelect
					:country="country"
					@update:country="onUpdateCountry"
				/>
				<RegionSelect
					:country="country"
					:region="region"
					@loading="(status: boolean) => (loading = status)"
					@update:region="onUpdateRegion"
				/>

				<div>
					<span>{{ $t('back') }}</span>
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
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useDebounceFn } from '@vueuse/core';
	import { LMarker } from '@vue-leaflet/vue-leaflet';

	import { getRecentNotableObsInRegionApi } from '@/api/data/obs';
	import {
		DATAOBSGetRecentNotableObsInRegionReq,
		IDATAOBSGetRecentNotableObsInRegionItem,
	} from '@/models/data/obs';
	import { IREFTAXGetEbirdTaxonomyRes } from '@/models/ref/taxonomy';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { LocaleEnum } from '@/models/enum/ebirdEnum';
	import { IMap } from '@/models/common/base';
	import { MarkerClickEvent } from '@/components/common/Leaflet/types';
	import { getDateDiffFromNow, getGoogleMapsPlaceURL } from '@/utils/ebird';

	const { t, locale } = useI18n();
	const { $notify, $loading } = useQuasarTool();
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
	// 新物種代碼列表(尚不存在於物種資訊字典)
	const newSpeciesCodes = computed(() => {
		const oldSpeciesCodes = Object.keys(taxInfoDict.value);
		return pureSpeciesCodes.value.filter((code) => !oldSpeciesCodes.includes(code));
	});

	watch(
		[country, region, notableObsForm],
		() => {
			// 儲存查詢參數，下次開啟使用
			localStorage.setItem(
				'rareBirds-searchForm',
				JSON.stringify({
					c: country.value,
					r: region.value,
					n: notableObsForm.value,
				})
			);

			debouncedGetNotableObs();
		},
		{ deep: true }
	);

	/**
	 * 以搜尋結果第一筆做地圖中心
	 */
	watch(
		pureObsList,
		(nv) => {
			if (!nv.length) return;
			mapRef.value.updateCenter([nv[0].lat, nv[0].lng]);
		},
		{ deep: true }
	);

	/**
	 * 取得物種分類資訊
	 */
	const getEbirdTaxonomyInfo = (all: boolean) => {
		taxonomyStore
			.getEbirdTaxonomyInfo(
				locale.value as LocaleEnum,
				all ? pureSpeciesCodes.value.join(',') : newSpeciesCodes.value.join(',')
			)
			.then((data) => {
				// 切換網站語言，重設字典
				all && (taxInfoDict.value = {});

				// console.log('speciesTaxonomies', data);
				data &&
					data.forEach((tax) => {
						taxInfoDict.value[tax.speciesCode] = tax;
					});
			});
	};
	/**
	 * 有新鳥種時，建立物種代碼對當地俗名字典
	 */
	watch(newSpeciesCodes, (nv) => {
		if (!nv.length) return;
		getEbirdTaxonomyInfo(false);
	});
	/**
	 * 切換網站語言時，建立物種代碼對當地俗名字典
	 */
	watch(locale, () => {
		getEbirdTaxonomyInfo(true);
	});

	/**
	 * 更新國家
	 */
	const onUpdateCountry = (val: string) => {
		country.value = val;
		// 調整地圖縮放
		mapRef.value.updateZoom(4);
	};

	/**
	 * 更新地區
	 */
	const onUpdateRegion = (val: string | undefined) => {
		region.value = val || null;
		// 調整地圖縮放
		if (val) {
			mapRef.value.updateZoom(8);
		}
	};

	/**
	 * 取得近期稀有鳥紀錄
	 */
	const getRecentNotableObsInRegionInfo = () => {
		$loading.on();
		// 資料更新按鈕
		mapRef.value && mapRef.value.setUpdateLoadingState(true);
		getRecentNotableObsInRegionApi(region.value || country.value, notableObsForm.value)
			.then((data) => {
				// $notify.success('成功：取得近期稀有鳥紀錄');
				console.log('notableObsList', data);
				if (!data.length) {
					$notify.warning('無紀錄');
				}
				notableObsList.value = data;
			})
			.catch(() => {
				$notify.error('失敗：取得近期稀有鳥紀錄');
			})
			.finally(() => {
				$loading.off();
				// 資料更新按鈕
				mapRef.value && mapRef.value.setUpdateLoadingState(false);
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
		return days ? `${days} ${t('ago')}` : t('today');
	};

	/**
	 * 開啟細節跳窗
	 */
	const onOpenRbMarkerDetailDialog = (obs: IDATAOBSGetRecentNotableObsInRegionItem) => {
		rbMarkerDetailDialogRef.value.open(obs, taxInfoDict.value);
	};

	onBeforeMount(() => {
		// localStorage.removeItem('rareBirds-searchForm');
		const oldSearchFormStr = localStorage.getItem('rareBirds-searchForm');
		if (oldSearchFormStr) {
			// 延續使用者最近一次的查詢參數
			const { c, r, n } = JSON.parse(oldSearchFormStr);
			country.value = c;
			region.value = r;
			notableObsForm.value = n;
		} else {
			getRecentNotableObsInRegionInfo();
		}
	});
</script>

<style lang="scss" scoped></style>
