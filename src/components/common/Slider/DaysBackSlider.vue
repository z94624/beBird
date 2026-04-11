<template>
	<BaseSlider
		ref="sliderRef"
		:="getBindingValues"
		:thumb-size="`${textSizeMultiplier}rem`"
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
			markerLabels: getMarkerLabels,
		};
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

<style lang="scss" scoped></style>
