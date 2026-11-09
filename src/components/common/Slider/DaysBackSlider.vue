<template>
	<BaseSlider
		ref="sliderRef"
		:="getBindingValues"
		:thumb-size="`${textSizeMultiplier}rem`"
		class="days-back-slider"
		@update:model-value="(value: number | null) => emit('update:model-value', value)"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseSlider>
</template>

<script lang="ts" setup>
	import { QSlider, QSliderProps } from 'quasar';
	import { computed, ref, toRefs, useAttrs, useSlots } from 'vue';

	import { getDaysLightenColor, DEFAULT_MARKER_BASE_COLOR } from '@/hooks/useMarkerColor';
	import { useTextSizeStore } from '@/store/modules/style';

	const emit = defineEmits<{
		(e: 'update:model-value', v: number | null): void;
	}>();
	const props = withDefaults(
		defineProps<{
			snap?: boolean;
			reverse?: boolean;
			labelAlways?: boolean;

			markers?: boolean | number;

			min?: number;
			max?: number;
			modelValue: number | null;

			switchLabelSide?: boolean;
		}>(),
		{
			snap: true,
			reverse: true,
			labelAlways: true,
			markers: 5,
			min: 1,
			max: 30,
			switchLabelSide: false,
		}
	);

	const attrs: Partial<QSliderProps> = useAttrs() as any;
	const slots: Partial<QSlider> = useSlots();
	const textSizeStore = useTextSizeStore();
	const { textSizeMultiplier } = toRefs(textSizeStore);

	const sliderRef = ref();

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,
			selectionColor: 'transparent',
			markerLabels: getMarkerLabels,
		};
	});

	/**
	 * ??useMarkerColor ?–é?æ·¡å?ç¨‹åº¦å®Œå…¨?Œæ­¥?„é??²è?ç®?
	 */
	// ?€ä¹…é?ï¼ˆå¤©?¸ç‚º maxï¼‰ï??€å¤§æ·¡?–ç?åº¦ï?æ·ºè‰²ï¼?
	const lightestColor = computed(() =>
		getDaysLightenColor(props.max, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// ?€?°é®®ï¼ˆå¤©?¸ç‚º 0 ??minï¼‰ï??¡æ·¡?–ï?æ·±è‰² / primaryï¼?
	const darkestColor = computed(() =>
		getDaysLightenColor(0, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// ?¶å?æ»‘å??¸å?å¤©æ•¸å°æ??„å??˜æ·¡?–è‰²
	const currentColor = computed(() =>
		getDaysLightenColor(props.modelValue ?? props.min, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// è»Œé?æ¼¸å±¤?²ï?å¤©æ•¸å¤?ä¹…é?)ç«¯ç‚ºæ·ºè‰²ï¼Œå¤©?¸å?(?°é®®)ç«¯ç‚ºæ·±è‰²
	// ??reverse = true (?è¨­) ?‚ï?å·¦ç«¯??max(æ·ºè‰²)?å³ç«¯ç‚º min(æ·±è‰²)ï¼Œå??¾ã€Œå·¦æ·ºè‡³?³æ·±??
	const trackGradient = computed(() => {
		return props.reverse
			? `linear-gradient(to right, ${lightestColor.value}, ${darkestColor.value})`
			: `linear-gradient(to right, ${darkestColor.value}, ${lightestColor.value})`;
	});

	// ?•æ??‡å?å°æ??²ï?å¤©æ•¸è¼ƒå¤§(æ·ºè‰²)?‚ä½¿?¨æ·±?²å?é«”ï??ä?ä½¿ç”¨?½è‰²å­—é?ï¼Œç¢ºä¿?WCAG ?¯è???
	const labelTextColor = computed(() => {
		const val = props.modelValue ?? props.min;
		return val > 12 ? 'var(--q-lightText)' : 'var(--q-darkText)';
	});

	/**
	 * Marker ?‡å?é¡¯ç¤º
	 * @param value å¹¾å¤©ä»¥å?
	 */
	const getMarkerLabels = (value: number): string => {
		// ?ªé¡¯ç¤ºé ­å°?
		if (![props.min, props.max].includes(value)) return ' ';
		return `${value}`;
	};

	defineExpose({ sliderRef });
</script>

<style lang="scss" scoped>
	.days-back-slider {
		// è»Œé?ï¼šå??¨è??–é?æ·¡å??Œæ­¥ä¹‹ç”±æ·ºè‡³æ·±æ¼¸å±?
		:deep(.q-slider__track) {
			background: v-bind(trackGradient) !important;
			height: 6px;
			border-radius: 3px;
			opacity: 0.95;
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
		}

		// ?¸å?æ¢è¨­?ºé€æ?ï¼Œå??´å?ç¤ºå…¨?‰è?æ¼¸å±¤
		:deep(.q-slider__selection) {
			background: transparent !important;
		}

		// æ»‘å?é¡è‰²?Œæ­¥?¶å?å¤©æ•¸æ·¡å??²ï?ä¸¦å¸¶?‰ç²¾ç·»ç?é«”é™°å½?
		:deep(.q-slider__thumb) {
			color: v-bind(currentColor) !important;
		}

		:deep(.q-slider__thumb-shape) {
			filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
			transition: filter 0.2s ease;
		}

		// æµ®å?æ¨™ç±¤ï¼ˆPinï¼‰é??²å?æ­?
		:deep(.q-slider__pin) {
			color: v-bind(currentColor) !important;
		}

		// æ¨™ç±¤?‡å?ç¢ºä??¨ä??Œæ?åº¦ä??†å…·?™æ??°å?æ¯”åº¦
		:deep(.q-slider__text) {
			color: v-bind(labelTextColor) !important;
			font-weight: 700;
		}

		// ?»åº¦é»ä»¥?Šé€æ?è³ªæ??å…¥æ¼¸å±¤
		:deep(.q-slider__markers) {
			opacity: 0.55;
		}

		:deep(.q-slider__marker-labels) {
			font-weight: 500;
			opacity: 0.85;
		}
	}
</style>
