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
				width: isMobile ? 'calc(100vw - 11.6px - 53.2px)' : '33%',
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
				:text-color="locateColor"
				color="white"
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

				<slot name="markers"></slot>
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, reactive, ref, watch } from 'vue';
	import { useGeolocation } from '@vueuse/core';
	import {
		LMap,
		LTileLayer,
		LControlLayers,
		LControlScale,
		LControlZoom,
	} from '@vue-leaflet/vue-leaflet';
	import { PointExpression } from 'leaflet';

	import { usePlatform } from '@/hooks/platform';
	import { GeoDataEnum } from '@/models/enum/geoEnum';

	// 監測定位
	const { coords, error, resume, pause } = useGeolocation();
	const { isMobile } = usePlatform();

	const map = ref(null);
	const center = ref<PointExpression>([
		GeoDataEnum.LATITUDE_OF_TAIWAN,
		GeoDataEnum.LONGITUDE_OF_TAIWAN,
	] as PointExpression);
	const zoom = ref(8); // max: 18; min: 0; locate: 16
	const morph = ref('btn');
	const locateStatus = ref(false);
	const locateColor = ref('secondary_e');

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
			name: 'OPNVKarte',
			url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
			visible: false,
		},
		{
			name: 'OpenTopoMap',
			url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			visible: false,
		},
		{
			name: 'Stadia_AlidadeSmoothDark',
			url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
			visible: false,
		},
		{
			name: 'Stadia_AlidadeSatellite',
			url: 'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png',
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
			if (!triggerSrcDict.center) {
				updateCenter(userGeoLocation.value);
			}
		},
		{ deep: true }
	);

	/**
	 * 開啟定位
	 */
	const resumeLocating = () => {
		locateColor.value = 'primary';
		resume();
	};
	/**
	 * 停止定位
	 */
	const pauseLocating = () => {
		locateColor.value = 'secondary_e';
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
			updateCenter(userGeoLocation.value);
			triggerSrcDict.center = 'locate';
		} else {
			// 取消定位
			pauseLocating();
		}
	};

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
