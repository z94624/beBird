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
				size="md"
				text-color="primary"
				@click="nextMorph"
			/>

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
	const morph = ref('btn');

	interface IMorphStepDict {
		btn: string;
		panel: string;
	}
	const nextMorphStep: IMorphStepDict = {
		btn: 'panel',
		panel: 'btn',
	};

	/**
	 * 改變地圖中心
	 * @param newCenter 地圖新中心
	 */
	const updateCenter = (newCenter: PointExpression) => {
		center.value = newCenter;
	};

	/**
	 * 收合 Search Panel
	 */
	const nextMorph = () => {
		morph.value = nextMorphStep[morph.value as keyof IMorphStepDict];
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

	.map-top-right {
		position: absolute;
		top: 11.6px;
		right: 11.6px;
		z-index: 401;
	}
	.searchMenuContainer {
		@extend .map-top-right;

		min-width: 250px;
		padding: 12px;
		background-color: rgba($color: #fff, $alpha: 0.75);
	}
</style>
