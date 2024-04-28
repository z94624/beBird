<template>
	<div class="fullContainer relative">
		<div class="searchMenuContainer">
			<slot name="search-menu"></slot>
		</div>

		<div class="mapContainer">
			<l-map
				ref="map"
				:center="[23.97565, 120.9738819]"
				:use-global-leaflet="false"
				:zoom="8"
			>
				<l-tile-layer
					layer-type="base"
					name="OpenStreetMap"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				></l-tile-layer>
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
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
