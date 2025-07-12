<template>
	<!-- 天氣 -->
	<WeatherButton
		:lat="mapCenter.lat.toString()"
		:lng="mapCenter.lng.toString()"
		height="2.6rem"
		padding="0.4375rem"
		width="2.6rem"
	/>

	<!-- 人次 -->
	<BaseButton
		:icon="fasUsers"
		round
		text-color="primary"
	>
		<q-tooltip class="bg-white">
			<VisitorsBillboard />
		</q-tooltip>
	</BaseButton>

	<!-- 版本 -->
	<BaseButton
		:label="`v${versionList[0].version}`"
		rounded
		text-color="primary"
		@click="$emit('click-version-button')"
	/>

	<!-- 網站語言 -->
	<WebLangButton
		padding="0"
		rounded
	/>

	<!-- 網站字體大小 -->
	<WebTextSizeButton round />
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';
	import WeatherButton from './weather/WeatherButton.vue';
	import VisitorsBillboard from './VisitorsBillboard.vue';
	import WebLangButton from './WebLangButton.vue';
	import WebTextSizeButton from './WebTextSizeButton.vue';
	import { fasUsers } from '@quasar/extras/fontawesome-v6';

	import { useLeafletStore } from '@/store/modules/geodata';
	import { versionList } from '@/layout/utils';

	// Leaflet Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);
</script>

<style lang="scss" scoped></style>
