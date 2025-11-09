<template>
	<!-- 天氣 -->
	<WeatherButton
		:lat="mapCenter.lat.toString()"
		:lng="mapCenter.lng.toString()"
		:padding="weatherBtnPadding"
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
		:padding="versionBtnPadding"
		rounded
		text-color="primary"
		@click="emit('click-version-button')"
	/>

	<!-- 網站語言 -->
	<WebLangButton
		:padding="webLangBtnPadding"
		rounded
	/>

	<!-- 網站字體大小 -->
	<WebTextSizeButton round />

	<!-- 亮暗模式切換 -->
	<j-mode-switch :width="jModeSwitchWidth" />
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';
	import WeatherButton from './weather/WeatherButton.vue';
	import VisitorsBillboard from './VisitorsBillboard.vue';
	import WebLangButton from './WebLangButton.vue';
	import WebTextSizeButton from './WebTextSizeButton.vue';
	import JModeSwitch from '@/components/common/modeSwitch/JModeSwitch.vue';
	import { fasUsers } from '@quasar/extras/fontawesome-v6';

	import { useLeafletStore } from '@/store/modules/geodata';
	import { useTextSizeStore } from '@/store/modules/style';
	import { versionList } from '@/layout/utils';

	const emit = defineEmits<{
		(e: 'click-version-button'): void;
	}>();

	// Leaflet Store
	const leafletStore = useLeafletStore();
	const { mapCenter } = toRefs(leafletStore);
	const textSizeStore = useTextSizeStore();
	const { textSizeMultiplier, isTextSizeMd, isTextSizeLg, isTextSizeXl } = toRefs(textSizeStore);

	/**
	 * 天氣按鈕 Padding
	 */
	const weatherBtnPadding = computed(() => {
		if (isTextSizeMd.value) {
			return '0.52925rem';
		} else if (isTextSizeLg.value) {
			return '0.8175rem';
		} else if (isTextSizeXl.value) {
			return '1.1065625rem';
		} else {
			return undefined;
		}
	});

	/**
	 * 版本按鈕 Padding
	 */
	const versionBtnPadding = computed(() => {
		if (isTextSizeMd.value) {
			return `0.800625rem ${0.800625 / 0.85}rem`;
		} else if (isTextSizeLg.value) {
			return `1.225rem ${1.225 / 0.85}rem`;
		} else if (isTextSizeXl.value) {
			return `1.65rem ${1.65 / 0.85}rem`;
		} else {
			return undefined;
		}
	});

	/**
	 * 網站語言按鈕 Padding
	 */
	const webLangBtnPadding = computed(() => {
		if (isTextSizeMd.value) {
			return `0.08125rem ${0.08125 / 0.85}rem`;
		} else if (isTextSizeLg.value) {
			return `0.75625rem ${0.75625 / 0.85}rem`;
		} else if (isTextSizeXl.value) {
			return `1.43125rem ${1.43125 / 0.85}rem`;
		} else {
			return undefined;
		}
	});

	/**
	 * 亮暗模式切換按鈕寬度
	 */
	const jModeSwitchWidth = computed(() => {
		if (isTextSizeMd.value) {
			return '7.2rem';
		} else if (isTextSizeLg.value) {
			return '9.5rem';
		} else if (isTextSizeXl.value) {
			return '11.8rem';
		} else {
			return undefined;
		}
	});
</script>

<style lang="scss" scoped></style>
