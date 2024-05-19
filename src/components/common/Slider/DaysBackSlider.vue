<template>
	<BaseSlider
		ref="sliderRef"
		:="getBindingValues"
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
	import { computed, ref, useAttrs, useSlots } from 'vue';

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
			switchLabelSide: true,
		}
	);

	const attrs: Partial<QSliderProps> = useAttrs();
	const slots: Partial<QSlider> = useSlots();

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
