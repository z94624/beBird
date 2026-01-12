<template>
	<div class="fullContainer relative">
		<BaseButton
			v-morph:btn.resize="birdMorph"
			:text-color="bg_name_mode"
			class="map-top-right"
			color="primary"
			fab
			icon="search"
			round
			size="lg"
			@click="!isMobile ? nextBirdMorph() : toggleSearchDrawer()"
		/>
		<div
			v-if="!isMobile"
			v-morph:panel.resize="birdMorph"
			class="searchMenuContainer w-[33%] shadow-3 rounded-borders relative"
		>
			<BaseButton
				:text-color="bg_name_mode"
				class="absolute -left-2 -bottom-2"
				color="primary"
				icon="arrow_outward"
				round
				size="sm"
				@click="nextBirdMorph"
			/>
			<slot name="search-menu"></slot>
		</div>
		<q-drawer
			v-else
			v-model="searchDrawerOpen"
			behavior="mobile"
			bordered
			class="p-4"
			overlay
			side="right"
		>
			<slot name="search-menu"></slot>
		</q-drawer>

		<BaseButton
			:color="bg_name_mode"
			:icon="fasRotateRight"
			:loading="updateLoading"
			:style="{
				top:
					birdMorph === 'btn'
						? `calc(${boundaryGap} + 3.6rem + 0.25rem)`
						: `calc(${boundaryGap} + ${isTextSizeMd ? '15.75rem' : isTextSizeLg ? '19.1875rem' : '23.35rem'} + 0.25rem)`,
			}"
			class="researchBtn"
			fab
			round
			size="lg"
			text-color="primary"
			@click="emit('research')"
		/>

		<div
			:style="{
				bottom: `calc(${boundaryGap} + ${isTextSizeMd ? '5.525rem' : isTextSizeLg ? '6.05rem' : '6.575rem'})`,
			}"
			class="bottomRightToolbar flex flex-col gap-1"
		>
			<BaseButton
				:color="locateColor.color"
				:text-color="locateColor.textColor"
				dense
				icon="my_location"
				padding="0.4015625rem"
				size="sm"
				style="border-radius: 0.5rem"
				@click="onLocate"
			/>
		</div>

		<div class="mapContainer">
			<l-map
				v-model:center="center"
				v-model:zoom="zoom"
				ref="mapRef"
				:options="{ zoomControl: false, preferCanvas: true }"
				:use-global-leaflet="true"
				class="map"
				@baselayerchange="onBaseLayerChange"
				@ready="(obj: Map) => (leafletMap = obj)"
				@update:bounds="onUpdateBounds"
				@update:center="onUpdateCenter"
				@update:zoom="onUpdateZoom"
			>
				<l-control-layers position="bottomleft" />

				<l-tile-layer
					v-for="tileProvider in tileProviders"
					:key="tileProvider.name"
					:attribution="`${isMobile && !isTextSizeMd ? '© smoBEE' : '© 2024 smoBEE & Cake'} | ${tileProvider.attribution}`"
					:name="tileProvider.name"
					:url="tileProvider.url"
					:visible="tileProvider.visible"
					layer-type="base"
				/>

				<l-control-scale />
				<l-control-zoom position="bottomright" />

				<template v-if="locatedAt">
					<l-circle
						:lat-lng="userGeoLocation as LatLngExpression"
						:radius="Math.ceil(coords.accuracy / 2)"
						:stroke="false"
					/>
					<l-circle-marker
						:fillOpacity="1"
						:lat-lng="userGeoLocation as LatLngExpression"
						:radius="6.5"
						:stroke="false"
						fillColor="#fff"
					/>
					<l-circle-marker
						:fillOpacity="1"
						:lat-lng="userGeoLocation as LatLngExpression"
						:radius="3.5"
						fillColor="#3388ff"
					/>
				</template>

				<slot
					v-if="markersNumber <= 100"
					name="markers"
				></slot>
				<l-marker-cluster-group v-else>
					<slot name="markers"></slot>
				</l-marker-cluster-group>
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
	import { useGeolocation } from '@vueuse/core';
	import { LatLng, LatLngExpression, LayersControlEvent, Map, PointExpression } from 'leaflet';
	import {
		LMap,
		LTileLayer,
		LControlLayers,
		LControlScale,
		LControlZoom,
		LCircle,
		LCircleMarker,
	} from '@vue-leaflet/vue-leaflet';
	import { LMarkerClusterGroup } from 'vue-leaflet-markercluster';
	import { fasRotateRight } from '@quasar/extras/fontawesome-v6';

	import { usePlatform } from '@/hooks/platform';
	import { useLeafletStore } from '@/store/modules/geodata';
	import { useModeStore, useTextSizeStore } from '@/store/modules/style';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { ModeEnum } from '@/models/enum/styleEnum';

	// 定義事件發送
	const emit = defineEmits<{
		(e: 'research'): void; // 點擊重新搜尋事件
	}>();

	// 定義組件接收屬性
	const props = defineProps<{
		markersNumber: number; // 外部傳入的標記總數
	}>();

	// 裝置定位 Hook
	const { coords, locatedAt, error, resume, pause } = useGeolocation();
	// 判斷裝置類型 Hook
	const { isMobile } = usePlatform();

	// 地圖資料 Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);

	// 字體大小 Store (控制 UI 排版)
	const textSizeStore = useTextSizeStore();
	const { isTextSizeMd, isTextSizeLg } = toRefs(textSizeStore);

	// 主題模式 Store (控制深淺色)
	const modeStore = useModeStore();
	const { mode, bg_name_mode, text_name_mode } = toRefs(modeStore);

	// 地圖佈局響應式變數
	const boundaryGap = ref('0.625rem'); // 邊界間距
	const updateLoading = ref(false); // 更新按鈕 Loading 狀態
	const mapRef = ref(null); // 地圖組件 Ref
	const leafletMap = ref<Map>(); // 地圖實例
	const center = ref<PointExpression>([
		GeoDataEnum.LATITUDE_OF_TAIWAN,
		GeoDataEnum.LONGITUDE_OF_TAIWAN,
	] as PointExpression); // 預設地圖中心點
	const zoom = ref(8); // 預設縮放層級
	const birdMorph = ref('btn'); // Morph 動畫狀態
	const searchDrawerOpen = ref(false); // 移動端抽屜狀態
	const locateStatus = ref(false); // 目前是否開啟定位追蹤狀態

	// 計算定位按鈕顏色 (啟用時與停用時的配色切換)
	const locateColor = computed(() => {
		if (locateStatus.value) {
			return {
				textColor: bg_name_mode.value,
				color: 'primary',
			};
		} else {
			return {
				textColor: text_name_mode.value,
				color: bg_name_mode.value,
			};
		}
	});

	// 使用者目前地理位置計算屬性
	const userGeoLocation = computed(
		(): PointExpression => [coords.value.latitude, coords.value.longitude]
	);

	// 用於記錄各種地圖變更事件的觸發源，避免無窮迴圈或邏輯混亂
	const triggerSrcDict = reactive({
		center: '',
		zoom: '',
		bounds: '',
	});

	// Morph 動畫步驟定義
	interface IMorphStepDict {
		btn: string;
		panel: string;
	}
	const nextBirdMorphStep: IMorphStepDict = {
		btn: 'panel',
		panel: 'btn',
	};

	// 可用的地圖底圖供應商列表
	const tileProviders = reactive([
		// --- 1. 標準現代化風格 (適合淺色模式預設) ---
		{
			name: 'CartoDB_Voyager',
			url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			visible: false,
			// 特色：視覺現代化且乾淨，顏色比 OSM 輕盈，非常適合作為 Web App 的預設底圖，能讓上方的圖釘（Marker）更顯眼。
		},
		{
			name: 'OpenStreetMap',
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			visible: false,
			// 特色：全球最知名的開源地圖，資訊量最完整（含門牌、小徑），但視覺配色較為繽紛，適合導航或資訊查詢。
		},
		{
			name: 'CartoDB_Positron',
			url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			visible: false,
			// 特色：極簡主義的灰白底圖，幾乎濾掉了所有鮮豔色彩，最適合用於「數據視覺化」，能極大化突出熱點圖或彩色圖釘。
		},

		// --- 2. 深色質感風格 (適合深色模式預設) ---
		{
			name: 'CartoDB_DarkMatter',
			url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			visible: false,
			// 特色：最經典的深色地圖，以黑灰色調為主，能減輕長時間閱讀的視覺疲勞，與螢光色系的圖釘配合效果極佳。
		},
		{
			name: 'Stadia_AlidadeSmoothDark',
			url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
			attribution:
				'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			visible: false,
			// 特色：比 DarkMatter 稍微帶一點深藍感，標籤印刷感較強，層次分明，是極具質感的深色底圖選擇。
		},

		// --- 3. 地理與功能性風格 (特殊需求) ---
		{
			name: 'OpenTopoMap',
			url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			attribution:
				'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
			visible: false,
			// 特色：強調「等高線」與「地形渲染」，風格偏向傳統紙本地圖，非常適合戶外活動、登山或地理特徵分析。
		},
		{
			name: 'Esri_WorldImagery',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			attribution:
				'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community',
			visible: false,
			// 特色：高解析度衛星影像，能看到真實的建物屋頂與植被，通常用於輔助確認具體位置的周邊實景。
		},
		{
			name: 'CyclOSM',
			url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
			attribution:
				'<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - OpenStreetMap bicycle layer">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			visible: false,
			// 特色：專為「單車騎士」設計，會特別標註單車道、修車店、坡度等資訊，若 App 與運動相關則非常實用。
		},
	]);

	/**
	 * 監聽深淺色模式切換，自動變更底圖
	 * 確保地圖底圖風格能與應用程式 UI 主題同步
	 */
	watch(
		mode,
		(newMode) => {
			// 根據深色/淺色模式指定對應底圖名稱
			const targetLayerName =
				newMode === ModeEnum.DARK ? 'CartoDB_DarkMatter' : 'CartoDB_Voyager';

			// 更新 tileProviders 中的 visible 狀態以切換地圖
			tileProviders.forEach((provider) => {
				provider.visible = provider.name === targetLayerName;
			});
		},
		{ immediate: true } // 確保初始化時即執行一次
	);

	// 監聽定位座標變化，自動更新地圖中心
	watch(
		coords,
		() => {
			updateCenter(userGeoLocation.value);
		},
		{ deep: true }
	);

	/**
	 * 開關移動端搜尋選單抽屜
	 */
	const toggleSearchDrawer = () => {
		searchDrawerOpen.value = !searchDrawerOpen.value;
	};

	/**
	 * 提供給外部調用，更新重新搜尋按鈕的 Loading 狀態
	 */
	const setUpdateLoadingState = (loading: boolean) => {
		updateLoading.value = loading;
	};

	/**
	 * 開啟裝置定位功能
	 */
	const resumeLocating = () => {
		resume();
	};

	/**
	 * 停止裝置定位功能
	 */
	const pauseLocating = () => {
		pause();
	};

	/**
	 * 更新地圖中心點
	 */
	const updateCenter = (newCenter: PointExpression) => {
		center.value = newCenter;
	};

	/**
	 * 地圖中心更新事件處理
	 * 順序：先移動中心點，若為定位操作則於延遲後進行縮放
	 */
	const onUpdateCenter = (newCenter: LatLng) => {
		// 同步到 Store
		mapCenter.value = newCenter;

		// 若觸發源是定位按鈕，中心定位後自動縮放到層級 16
		switch (triggerSrcDict.center) {
			case 'locate':
				triggerSrcDict.center = '';
				setTimeout(() => updateZoom(16), 500);
				triggerSrcDict.zoom = 'locate';
				break;
		}
	};

	/**
	 * 手動更新地圖縮放層級
	 */
	const updateZoom = (newZoom: number) => {
		zoom.value = newZoom;
	};

	/**
	 * 地圖縮放更新回調事件
	 */
	const onUpdateZoom = () => {};

	/**
	 * 地圖邊界更新回調事件
	 */
	const onUpdateBounds = () => {};

	/**
	 * 當使用者手動透過 Leaflet Control 切換底圖時觸發
	 * 用於保持 tileProviders 資料與 Leaflet 內部狀態同步
	 */
	const onBaseLayerChange = (e: LayersControlEvent) => {
		const selectedLayerName = e.name;
		tileProviders.forEach((provider) => {
			provider.visible = provider.name === selectedLayerName;
		});
	};

	/**
	 * 切換桌面端搜尋面板的 Morph 顯示狀態
	 */
	const nextBirdMorph = () => {
		birdMorph.value = nextBirdMorphStep[birdMorph.value as keyof IMorphStepDict];
	};

	/**
	 * 定位按鈕點擊處理邏輯 (切換定位開啟/關閉)
	 */
	const onLocate = () => {
		locateStatus.value = !locateStatus.value;
		if (locateStatus.value) {
			resumeLocating();
			triggerSrcDict.center = 'locate';
		} else {
			pauseLocating();
		}
	};

	// 組件掛載前預設停止定位追蹤，節省資源
	onBeforeMount(() => {
		pause();
	});

	// 暴露 API 供父組件使用
	defineExpose({
		setUpdateLoadingState,
		updateCenter,
		updateZoom,
	});
</script>

<style lang="scss" scoped>
	/* 基礎容器樣式：滿版畫面 */
	.fullContainer {
		width: 100%;
		height: 100%;
	}

	/* 地圖容器樣式：繼承滿版樣式 */
	.mapContainer {
		@extend .fullContainer;
	}

	/* 右上角 UI 組件位置定義 */
	.map-top-right {
		position: absolute;
		top: v-bind(boundaryGap);
		right: v-bind(boundaryGap);
		z-index: 401; // 需高於 Leaflet 預設層級 (400)
	}

	/* 搜尋選單容器 */
	.searchMenuContainer {
		@extend .map-top-right;
	}

	/* 重新搜尋按鈕：具備 top 位移動畫效果 */
	.researchBtn {
		@extend .map-top-right;
		transition: top 0.3s;
	}

	/* 右下角 UI 組件位置定義 */
	.map-bottom-right {
		position: absolute;
		right: v-bind(boundaryGap);
		z-index: 401;
	}

	/* 右下角工具欄容器 */
	.bottomRightToolbar {
		@extend .map-bottom-right;
	}
</style>
