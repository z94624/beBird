<template>
	<div class="fullContainer relative">
		<div class="searchMenuContainer shadow-3 rounded-borders">
			<slot name="search-menu"></slot>
		</div>

		<div class="mapContainer">
			<l-map
				ref="map"
				:center="center"
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
		(nv) => {
			center.value = [nv.latitude, nv.longitude];
		},
		{ deep: true }
	);
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
