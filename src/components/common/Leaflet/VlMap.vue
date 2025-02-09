<template>
	<div class="fullContainer relative">
		<!-- 右上功能區 -->
		<!-- 搜尋功能 -->
		<BaseButton
			v-morph:btn.resize="birdMorph"
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
				class="absolute -left-2 -bottom-2"
				color="white"
				icon="arrow_outward"
				round
				size="sm"
				text-color="primary"
				@click="nextBirdMorph"
			/>
			<slot name="search-menu"></slot>
		</div>
		<q-drawer
			v-else
			v-model="searchDrawerOpen"
			behavior="mobile"
			bordered
			class="p-3"
			overlay
			side="right"
		>
			<slot name="search-menu"></slot>
		</q-drawer>
		<!-- 資料更新按鈕 -->
		<BaseButton
			:icon="fasRotateRight"
			:loading="updateLoading"
			:style="{
				top:
					birdMorph === 'btn'
						? `calc(${boundaryGap} + 57.6px + 4px)`
						: `calc(${boundaryGap} + 244px + 4px)`,
			}"
			class="researchBtn"
			color="secondary"
			fab
			round
			size="lg"
			text-color="primary"
			@click="emit('research')"
		/>

		<!-- 右下功能區 -->
		<div class="bottomRightToolbar flex flex-col gap-1">
			<BaseButton
				:color="locateColor.color"
				:text-color="locateColor.textColor"
				dense
				icon="my_location"
				padding="6.425px"
				size="sm"
				style="border-radius: 8px"
				@click="onLocate"
			/>
		</div>

		<!-- 地圖 -->
		<div class="mapContainer">
			<l-map
				v-model:center="center"
				v-model:zoom="zoom"
				ref="map"
				:options="{ zoomControl: false }"
				:use-global-leaflet="false"
				class="map"
				@ready="(obj: Map) => (leafletMap = obj)"
				@update:bounds="onUpdateBounds"
				@update:center="onUpdateCenter"
				@update:zoom="onUpdateZoom"
			>
				<l-control-layers position="bottomleft" />
				<l-tile-layer
					v-for="tileProvider in tileProviders"
					:key="tileProvider.name"
					:name="tileProvider.name"
					:url="tileProvider.url"
					:visible="tileProvider.visible"
					attribution="© 2024 smoBEE & Cake"
					layer-type="base"
					@update:visible="tileProvider.onUpdateVisibility"
				/>

				<l-control-scale />
				<l-control-zoom position="bottomright" />

				<!--
					使用者圖釘
					LCircle 的 radius 單位：meters
					LCircleMarker 的 radius 單位：pixels
				-->
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
				<slot name="markers"></slot>
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
	import { useGeolocation } from '@vueuse/core';
	import {
		LMap,
		LTileLayer,
		LControlLayers,
		LControlScale,
		LControlZoom,
		LCircle,
		LCircleMarker,
	} from '@vue-leaflet/vue-leaflet';
	import L, { LatLng, LatLngExpression, Layer, Map, PointExpression } from 'leaflet';
	import { fasRotateRight } from '@quasar/extras/fontawesome-v6';

	import { usePlatform } from '@/hooks/platform';
	import { useLeafletStore } from '@/store/modules/geodata';
	import { GeoDataEnum } from '@/models/enum/geoEnum';

	const emit = defineEmits<{
		(e: 'research'): void; // 重新搜尋
	}>();

	// 監測定位
	const { coords, locatedAt, error, resume, pause } = useGeolocation();
	const { isMobile } = usePlatform();
	// Leaflet Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);

	const boundaryGap = ref('10px');
	const updateLoading = ref(false);
	const map = ref(null);
	const leafletMap = ref<Map>();
	const markerGroup = ref(L.layerGroup());
	const center = ref<PointExpression>([
		GeoDataEnum.LATITUDE_OF_TAIWAN,
		GeoDataEnum.LONGITUDE_OF_TAIWAN,
	] as PointExpression);
	const zoom = ref(8); // max: 18; min: 0; locate: 16
	const birdMorph = ref('btn');
	const searchDrawerOpen = ref(false);
	const locateStatus = ref(false);
	const locateColor = ref({
		textColor: 'black',
		color: 'white',
	});

	// 使用者經緯座標
	const userGeoLocation = computed(
		(): PointExpression => [coords.value.latitude, coords.value.longitude]
	);

	// 變更以下變數的觸發來源
	const triggerSrcDict = reactive({
		center: '',
		zoom: '',
		bounds: '',
	});

	interface IMorphStepDict {
		btn: string;
		panel: string;
	}
	const nextBirdMorphStep: IMorphStepDict = {
		btn: 'panel',
		panel: 'btn',
	};

	// 圖層列表
	const tileProviders: {
		name: string;
		url: string;
		visible: boolean;
		attribution?: string;
		onUpdateVisibility?: (val: boolean) => void;
	}[] = [
		{
			name: 'OpenStreetMap',
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			visible: true,
		},
		{
			name: 'OpenTopoMap',
			url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			visible: false,
		},
		{
			name: 'Esri_WorldImagery',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			visible: false,
		},
		{
			name: 'CartoDB_DarkMatter',
			url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
			visible: false,
		},
		{
			name: 'CartoDB_Voyager',
			url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
			visible: false,
		},
		{
			name: 'OPNVKarte',
			url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
			visible: false,
		},
		{
			name: 'CyclOSM',
			url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
			visible: false,
		},
	];

	watch(
		coords,
		() => {
			updateCenter(userGeoLocation.value);
		},
		{ deep: true }
	);

	/**
	 * 開關選單
	 */
	const toggleSearchDrawer = () => {
		searchDrawerOpen.value = !searchDrawerOpen.value;
	};

	/**
	 * 更新資料按鈕 Loading 狀態
	 */
	const setUpdateLoadingState = (loading: boolean) => {
		updateLoading.value = loading;
	};

	/**
	 * 開啟定位
	 */
	const resumeLocating = () => {
		locateColor.value = {
			textColor: 'white',
			color: 'primary',
		};
		resume();
	};
	/**
	 * 停止定位
	 */
	const pauseLocating = () => {
		locateColor.value = {
			textColor: 'black',
			color: 'white',
		};
		pause();
	};

	/**
	 * 改變地圖中心
	 * @param newCenter 地圖新中心
	 */
	const updateCenter = (newCenter: PointExpression) => {
		center.value = newCenter;
	};
	/**
	 * Triggers when center is updated
	 * 順序：先移動再縮放
	 */
	const onUpdateCenter = (newCenter: LatLng) => {
		// 儲存目前地圖中心位置
		mapCenter.value = newCenter;

		switch (triggerSrcDict.center) {
			case 'locate':
				triggerSrcDict.center = '';
				setTimeout(() => updateZoom(16), 500);
				triggerSrcDict.zoom = 'locate';
				break;
		}
	};

	/**
	 * 改變地圖縮放
	 * @param newZoom 地圖新縮放
	 */
	const updateZoom = (newZoom: number) => {
		zoom.value = newZoom;
	};
	/**
	 * Triggers when zoom is updated
	 */
	const onUpdateZoom = () => {};

	/**
	 * Triggers when bounds are updated
	 */
	const onUpdateBounds = () => {};

	/**
	 * 收合 Search Panel
	 */
	const nextBirdMorph = () => {
		birdMorph.value = nextBirdMorphStep[birdMorph.value as keyof IMorphStepDict];
	};

	/**
	 * 定位鈕
	 */
	const onLocate = () => {
		// Toggle Status
		locateStatus.value = !locateStatus.value;
		if (locateStatus.value) {
			// 開啟定位
			resumeLocating();
			triggerSrcDict.center = 'locate';
		} else {
			// 取消定位
			pauseLocating();
		}
	};

	/**
	 * 建立 Markers 至 Canvas 版 Leaflet
	 */
	const createMarkers = (
		infos: { position: LatLngExpression; tooltip?: string }[],
		options = {
			fillColor: 'red',
			fillOpacity: 0.5,
			color: 'red',
			permanent: true,
		}
	) => {
		if (!leafletMap.value) {
			console.warn('地圖尚未初始化');
			return;
		}

		const canvas = L.canvas({ padding: 0.5 });

		// 每次資料更新，先清空 Markers
		// markerGroup.value.clearLayers();
		markerGroup.value.getLayers().forEach((layer) => {
			try {
				markerGroup.value.removeLayer(layer); // 從 markerGroup 移除圖層
			} catch {}
		});

		infos.forEach((info) => {
			const marker = L.circleMarker(info.position, {
				renderer: canvas,
				radius: 5, // 標記大小
				fillColor: options.fillColor,
				fillOpacity: options.fillOpacity,
				color: options.color,
			});

			// 設定 Tooltip
			if (info.tooltip) {
				marker.bindTooltip(info.tooltip, {
					permanent: options.permanent, // true: 固定顯示，false: 滑鼠懸停時顯示
					direction: 'auto',
				});
			}

			markerGroup.value.addLayer(marker);
		});

		// 將 markerGroup 加入地圖
		if (!leafletMap.value.hasLayer(markerGroup.value as unknown as Layer)) {
			markerGroup.value.addTo(leafletMap.value);
		}
	};

	onBeforeMount(() => {
		pause();
	});

	defineExpose({
		setUpdateLoadingState,
		updateCenter,
		updateZoom,
		createMarkers,
	});
</script>

<style lang="scss" scoped>
	.fullContainer {
		width: 100%;
		height: 100%;
	}
	.mapContainer {
		@extend .fullContainer;
	}

	.map-top-right {
		position: absolute;
		top: v-bind(boundaryGap);
		right: v-bind(boundaryGap);
		z-index: 401;
	}
	.searchMenuContainer {
		@extend .map-top-right;

		min-width: 250px;
		padding: 12px;
		background-color: rgba($color: #fff, $alpha: 0.75);
	}
	.researchBtn {
		@extend .map-top-right;

		transition: top 0.3s;
	}

	.map-bottom-right {
		position: absolute;
		bottom: 93px;
		right: v-bind(boundaryGap);
		z-index: 401;
	}
	.bottomRightToolbar {
		@extend .map-bottom-right;
	}
</style>
