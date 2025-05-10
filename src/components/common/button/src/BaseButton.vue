<template>
	<q-btn
		:="getBindingValues"
		class="baseButton"
		no-caps
		no-wrap
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
			padding?: string;
			rounded?: boolean;
			square?: boolean;
			round?: boolean;
			dense?: boolean;
		}>(),
		{
			textColor: 'white',
			color: getContrastColor('white'),
		}
	);

	const attrs: Partial<QBtnProps> = useAttrs();
	const slots: Partial<QBtn> = useSlots();

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,

			color: props.color || getContrastColor(props.textColor),
			textColor: props.textColor || getContrastColor(props.color),
			padding: getPadding(),
		};
	});

	/**
	 * 計算 Padding
	 */
	const getPadding = (): string | undefined => {
		if (props.padding || props.round || props.dense) {
			return props.padding?.toString();
		}
		return '.85em 1em';
	};
</script>

<style lang="scss" scoped>
	.baseButton {
		font-weight: 700;
		font-size: 0.9rem;
		line-height: 1;
		border: 0.0625rem solid transparent;
	}
</style>
