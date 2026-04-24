<template>
	<VlMap
		ref="mapRef"
		:markers-number="pureObsList.length"
		@research="getRecentNotableObsInRegionInfo"
		@map-click="onMapClick"
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
					<span class="text-base">{{ $t('back') }}</span>
					<DaysBackSlider v-model="notableObsForm.back" />
				</div>
			</q-form>

			<SubLoading :show="loading" />
		</template>

		<template #markers>
			<l-circle-marker
				v-if="targetPoint"
				:lat-lng="[targetPoint.lat, targetPoint.lng]"
				:radius="8"
				color="#f56c6c"
				fillColor="#f56c6c"
				:fillOpacity="0.8"
				:weight="2"
			>
				<l-tooltip>選定位置</l-tooltip>
			</l-circle-marker>

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
						<HrefButton
							:href="`https://ebird.org/species/${obs.speciesCode}`"
							class="!w-full"
						>
							<q-badge
								:label="`×${obs.howMany ?? '???'}`"
								color="secondary"
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
	import { computed, nextTick, onBeforeMount, ref, toRefs, watch } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useDebounceFn } from '@vueuse/core';
	import { LMarker, LCircleMarker, LTooltip } from '@vue-leaflet/vue-leaflet';

	import { getRecentNotableObsInRegionApi } from '@/api/data/obs';
	import {
		DATAOBSGetRecentNotableObsInRegionReq,
		IDATAOBSGetRecentNotableObsInRegionItem,
	} from '@/models/data/obs';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { MarkerClickEvent } from '@/components/common/Leaflet/types';
	import { getDateDiffFromNow, getGoogleMapsPlaceURL } from '@/utils/ebird';

	const { t, locale } = useI18n();
	const { $notify, $loading } = useQuasarTool();
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);

	const loading = ref(false);
	const country = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	const region = ref<string | null>(null);
	const notableObsForm = ref(new DATAOBSGetRecentNotableObsInRegionReq());
	const notableObsList = ref<IDATAOBSGetRecentNotableObsInRegionItem[]>([]);
	const targetPoint = ref<{ lat: number; lng: number } | null>(null);

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
		taxonomyStore.getEbirdTaxonomyInfo(
			all ? pureSpeciesCodes.value.join(',') : newSpeciesCodes.value.join(',')
		);
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
		// $loading.on();
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
				// $loading.off();
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
	 * 使用者點擊地圖的反向地理編碼
	 */
	const onMapClick = async (latlng: { lat: number; lng: number }) => {
		targetPoint.value = latlng;
		mapRef.value.updateCenter([latlng.lat, latlng.lng]);

		$loading.on();
		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json&zoom=5`,
				{
					headers: {
						'User-Agent': 'beBird-Vue-App',
					},
				}
			);
			const data = await res.json();

			if (data && data.address) {
				const { country_code } = data.address;
				// Nominatim 可能給出 lvl4 或是 lvl6 的區域名稱，我們盡量取得 ISO3166-2
				const subnationalCode = data.address['ISO3166-2-lvl4'] || data.address['ISO3166-2-lvl6'];

				if (country_code) {
					const cCode = country_code.toUpperCase();
					
					if (country.value !== cCode) {
						country.value = cCode;
						// 等待 Vue re-render UpdateRegionOptions (避免 Race condition)
						await nextTick();
					}

					if (subnationalCode) {
						region.value = subnationalCode;
					} else {
						region.value = null; // 如果只點擊到國家沒有具體行政區，就會是 null
					}
					// $notify.success('成功：取得該地位置');
				} else {
					$notify.warning('找不到該座標的地點資訊');
					targetPoint.value = null;
				}
			} else {
				$notify.warning('無法解析該地點');
				targetPoint.value = null;
			}
		} catch (error) {
			console.error(error);
			$notify.error('反向地理編碼失敗');
			targetPoint.value = null;
		} finally {
			$loading.off();
		}
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
		rbMarkerDetailDialogRef.value.open(obs);
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
