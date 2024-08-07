<template>
	<div class="fullContainer relative">
		<BaseButton
			v-morph:btn.resize="morph"
			class="map-top-right"
			color="primary"
			fab
			icon="search"
			round
			size="lg"
			@click="nextMorph"
		/>
		<div
			v-morph:panel.resize="morph"
			:style="{
				width: isMobile ? 'calc(100vw - 20px)' : '33%',
			}"
			class="searchMenuContainer shadow-3 rounded-borders relative"
		>
			<BaseButton
				class="absolute -left-2 -bottom-2"
				color="white"
				icon="arrow_outward"
				round
				size="sm"
				text-color="primary"
				@click="nextMorph"
			/>

			<slot name="search-menu"></slot>
		</div>

		<div class="customToolbar flex flex-col gap-1">
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

		<div class="mapContainer">
			<l-map
				v-model:center="center"
				v-model:zoom="zoom"
				ref="map"
				:options="{ zoomControl: false }"
				:use-global-leaflet="false"
				class="map"
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
					attribution="© smoBEE"
					layer-type="base"
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
	import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
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
	import { LatLngExpression, PointExpression } from 'leaflet';

	import { usePlatform } from '@/hooks/platform';
	import { GeoDataEnum } from '@/models/enum/geoEnum';

	// 監測定位
	const { coords, locatedAt, error, resume, pause } = useGeolocation();
	const { isMobile } = usePlatform();

	const map = ref(null);
	const center = ref<PointExpression>([
		GeoDataEnum.LATITUDE_OF_TAIWAN,
		GeoDataEnum.LONGITUDE_OF_TAIWAN,
	] as PointExpression);
	const zoom = ref(8); // max: 18; min: 0; locate: 16
	const morph = ref('btn');
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
	const nextMorphStep: IMorphStepDict = {
		btn: 'panel',
		panel: 'btn',
	};

	// 圖層列表
	const tileProviders: {
		name: string;
		url: string;
		visible: boolean;
		attribution?: string;
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
	const onUpdateCenter = () => {
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
	const nextMorph = () => {
		morph.value = nextMorphStep[morph.value as keyof IMorphStepDict];
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

	onBeforeMount(() => {
		pause();
	});

	defineExpose({ updateCenter, updateZoom });
</script>

<style lang="scss" scoped>
	$boundary-gap: 10px;

	.fullContainer {
		width: 100%;
		height: 100%;
	}
	.mapContainer {
		@extend .fullContainer;
	}

	.map-top-right {
		position: absolute;
		top: $boundary-gap;
		right: $boundary-gap;
		z-index: 401;
	}
	.searchMenuContainer {
		@extend .map-top-right;

		min-width: 250px;
		padding: 12px;
		background-color: rgba($color: #fff, $alpha: 0.75);
	}

	.map-bottom-right {
		position: absolute;
		bottom: 93px;
		right: $boundary-gap;
		z-index: 401;
	}
	.customToolbar {
		@extend .map-bottom-right;
	}
</style>
