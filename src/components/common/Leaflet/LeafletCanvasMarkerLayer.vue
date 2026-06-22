<template>
	<!-- 這個元件並不需要在畫面上產生任何實際的 DOM 節點 -->
	<!-- 我們使用 display: none 隱藏它，並在其準備好之後才渲染子元件 (標記) -->
	<div style="display: none">
		<slot v-if="ready"></slot>
	</div>
</template>

<script lang="ts" setup>
	import { ref, inject, provide, onMounted, onUnmounted } from 'vue';
	import L from 'leaflet';
	import 'leaflet-canvas-marker';

	/**
	 * 從 vue-leaflet 父層級 (通常是 LMap) 注入的增減圖層方法
	 * 透過這些方法，我們可以將自己 (Canvas 圖層) 註冊到地圖實例中
	 */
	const addLayer = inject('addLayer') as Function;
	const removeLayer = inject('removeLayer') as Function;

	// 控制子元件 (slot) 何時開始渲染的旗標
	const ready = ref(false);

	// 用於存放此封裝層底層的 L.canvasIconLayer 實例
	const leafletObject = ref<any>(null);

	onMounted(() => {
		/**
		 * 初始化 canvasIconLayer
		 * 注意：@ts-expect-error 是因為 leaflet-canvas-marker 套件在載入時，
		 * 會動態將 canvasIconLayer 方法掛載到 L (Leaflet) 的全域物件上，
		 * 但型別檔不一定包含該擴充。
		 */
		// @ts-expect-error: L.canvasIconLayer is injected by leaflet-canvas-marker
		leafletObject.value = L.canvasIconLayer({});

		// 如果有父層 (例如 LMap)，就將自己新增進去
		if (addLayer) {
			addLayer({ leafletObject: leafletObject.value });
		}

		/**
		 * 提供客製化的 addLayer 函式給內部的子元件 (<l-marker>)
		 * 這是 vue-leaflet 的設計模式，當 <l-marker> 初始化完成時，
		 * 它會呼叫 inject 拿到的 addLayer 方法來將自己畫在地圖上。
		 * 我們攔截了這個行為，改為呼叫 leafletObject.value.addMarker(...)，
		 * 使標記由 Canvas 接手繪製，而不是成為一個個獨立的 DOM 節點。
		 */
		provide('addLayer', (layer: any) => {
			if (leafletObject.value && layer.leafletObject) {
				leafletObject.value.addMarker(layer.leafletObject);
			}
		});

		/**
		 * 提供客製化的 removeLayer 函式，處理標記移除或元件銷毀時的邏輯
		 */
		provide('removeLayer', (layer: any) => {
			if (leafletObject.value && layer.leafletObject) {
				leafletObject.value.removeMarker(layer.leafletObject, true);
			}
		});

		// 準備就緒，通知 template 可以開始渲染內部的 <l-marker>
		ready.value = true;
	});

	onUnmounted(() => {
		// 當本元件被銷毀時，將這個 Canvas 圖層從地圖中移除，避免記憶體洩漏
		if (removeLayer && leafletObject.value) {
			removeLayer({ leafletObject: leafletObject.value });
		}
	});

	// 將內部的 Leaflet 實例暴露出去，讓外部 (如有需要) 也可以存取
	defineExpose({
		leafletObject,
	});
</script>

<style lang="scss" scoped></style>
