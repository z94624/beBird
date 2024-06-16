<template>
	<q-btn
		:="getBindingValues"
		:style="{
			borderRadius: hasCustomBorderRadius && '3px',
		}"
		class="baseButton"
		no-caps
		no-wrap
		style="border: 1px solid transparent"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-btn>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QBtn, QBtnProps } from 'quasar';

	import { getContrastColor } from '@/utils/convert';

	const props = withDefaults(
		defineProps<{
			color?: string;
			textColor?: string;
			padding?: boolean | string;
			rounded?: boolean;
			square?: boolean;
			round?: boolean;
		}>(),
		{
			textColor: 'white',
			color: getContrastColor('white', 'palette'),
			padding: '.85em 1em',
		}
	);

	const attrs: Partial<QBtnProps> = useAttrs();
	const slots: Partial<QBtn> = useSlots();

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,

			color: props.color || getContrastColor(props.textColor, 'palette'),
			textColor: props.textColor || getContrastColor(props.color, 'palette'),
			padding: typeof props.padding === 'boolean' ? undefined : props.padding,
		};
	});

	// 是否使用自訂 Border Radius
	const hasCustomBorderRadius = computed(() => !props.rounded && !props.square && !props.round);
</script>

<style lang="scss" scoped>
	.baseButton {
		font-weight: 700;
		font-size: 0.9rem;
		line-height: 1;
	}
</style>
