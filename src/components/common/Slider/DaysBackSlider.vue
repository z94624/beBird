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

	const attrs: Partial<QSliderProps> = useAttrs();
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
	 * 與 useMarkerColor 圖釘淡化程度完全同步的顏色計算
	 */
	// 最久遠（天數為 max）：最大淡化程度（淺色）
	const lightestColor = computed(() =>
		getDaysLightenColor(props.max, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// 最新鮮（天數為 0 或 min）：無淡化（深色 / primary）
	const darkestColor = computed(() =>
		getDaysLightenColor(0, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// 當前滑塊選取天數對應的圖釘淡化色
	const currentColor = computed(() =>
		getDaysLightenColor(props.modelValue ?? props.min, props.max, DEFAULT_MARKER_BASE_COLOR)
	);

	// 軌道漸層色：天數多(久遠)端為淺色，天數少(新鮮)端為深色
	// 在 reverse = true (預設) 時，左端為 max(淺色)、右端為 min(深色)，呈現「左淺至右深」
	const trackGradient = computed(() => {
		return props.reverse
			? `linear-gradient(to right, ${lightestColor.value}, ${darkestColor.value})`
			: `linear-gradient(to right, ${darkestColor.value}, ${lightestColor.value})`;
	});

	// 動態文字對比色：天數較大(淺色)時使用深色字體，反之使用白色字體，確保 WCAG 可讀性
	const labelTextColor = computed(() => {
		const val = props.modelValue ?? props.min;
		return val > 12 ? 'var(--q-lightText)' : 'var(--q-darkText)';
	});

	/**
	 * Marker 文字顯示
	 * @param value 幾天以前
	 */
	const getMarkerLabels = (value: number): string => {
		// 只顯示頭尾
		if (![props.min, props.max].includes(value)) return ' ';
		return `${value}`;
	};

	defineExpose({ sliderRef });
</script>

<style lang="scss" scoped>
	.days-back-slider {
		// 軌道：套用與圖釘淡化同步之由淺至深漸層
		:deep(.q-slider__track) {
			background: v-bind(trackGradient) !important;
			height: 6px;
			border-radius: 3px;
			opacity: 0.95;
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
		}

		// 選取條設為透明，完整展示全光譜漸層
		:deep(.q-slider__selection) {
			background: transparent !important;
		}

		// 滑塊顏色同步當前天數淡化色，並帶有精緻立體陰影
		:deep(.q-slider__thumb) {
			color: v-bind(currentColor) !important;
		}

		:deep(.q-slider__thumb-shape) {
			filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
			transition: filter 0.2s ease;
		}

		// 浮動標籤（Pin）顏色同步
		:deep(.q-slider__pin) {
			color: v-bind(currentColor) !important;
		}

		// 標籤文字確保在不同明度下皆具備清晰對比度
		:deep(.q-slider__text) {
			color: v-bind(labelTextColor) !important;
			font-weight: 700;
		}

		// 刻度點以半透明質感融入漸層
		:deep(.q-slider__markers) {
			opacity: 0.55;
		}

		:deep(.q-slider__marker-labels) {
			font-weight: 500;
			opacity: 0.85;
		}
	}
</style>
