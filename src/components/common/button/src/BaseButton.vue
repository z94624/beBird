<template>
	<q-btn
		:="attrs"
		:style="{
			borderRadius: hasCustomBorderRadius && '3px',
		}"
		:text-color="textColor"
		class="baseButton"
		no-caps
		no-wrap
		padding=".85em 1em"
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
	import { QBtn, QBtnProps } from 'quasar';
	import { computed, useAttrs, useSlots } from 'vue';

	const props = withDefaults(
		defineProps<{
			textColor?: string;
			rounded?: boolean;
			square?: boolean;
			round?: boolean;
		}>(),
		{
			textColor: 'white',
		}
	);

	const attrs: Partial<QBtnProps> = useAttrs();
	const slots: Partial<QBtn> = useSlots();

	const hasCustomBorderRadius = computed(() => !props.rounded && !props.square && !props.round);
</script>

<style lang="scss" scoped>
	.baseButton {
		font-weight: 700;
		font-size: 0.9rem;
		line-height: 1;
	}
</style>
