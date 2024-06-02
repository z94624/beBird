<template>
	<div class="fullContainer relative">
		<div class="searchMenuContainer shadow-3 rounded-borders relative">
			<slot name="search-menu"></slot>
		</div>

		<div class="mapContainer">
			<l-map
				v-model:center="center"
				ref="map"
				:use-global-leaflet="false"
				:zoom="8"
				class="map"
			>
				<l-tile-layer
					layer-type="base"
					name="OpenStreetMap"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				></l-tile-layer>
				<l-control-scale />
				<l-control-attribution prefix="Leaflet | © smoBEE" />

				<slot name="markers"></slot>
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import { useGeolocation } from '@vueuse/core';
	import { LMap, LTileLayer, LControlScale, LControlAttribution } from '@vue-leaflet/vue-leaflet';
	import { PointExpression } from 'leaflet';

	import { GeoDataEnum } from '@/models/enum/geoEnum';

	const { coords, error, resume, pause } = useGeolocation();

	const map = ref(null);
	const center = ref<PointExpression>([
		GeoDataEnum.LATITUDE_OF_TAIWAN,
		GeoDataEnum.LONGITUDE_OF_TAIWAN,
	] as PointExpression);

	watch(
		coords,
		(nv, ov) => {
			center.value = [nv.latitude, nv.longitude];
			if (nv.latitude === ov.latitude && nv.longitude === ov.longitude) {
				pause();
			}
		},
		{ deep: true }
	);

	/**
	 * 改變地圖中心
	 * @param newCenter 地圖新中心
	 */
	const updateCenter = (newCenter: PointExpression) => {
		center.value = newCenter;
	};

	defineExpose({ updateCenter });
</script>

<style lang="scss" scoped>
	.fullContainer {
		width: 100%;
		height: 100%;
	}
	.mapContainer {
		@extend .fullContainer;
	}

	.searchMenuContainer {
		position: absolute;
		top: 11.6px;
		right: 11.6px;
		min-width: 200px;
		width: 33%;
		padding: 12px;
		background-color: rgba($color: #fff, $alpha: 0.25);
		z-index: 401;
	}
</style>
