<template>
	<q-btn
		:="attrs"
		:text-color="textColor"
		class="baseButton"
		no-wrap
		padding=".85em 1em"
		style="border: 1px solid transparent; border-radius: 3px"
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
	import { useAttrs, useSlots } from 'vue';

	const props = withDefaults(
		defineProps<{
			textColor?: string;
		}>(),
		{
			textColor: 'white',
		}
	);

	const attrs: Partial<QBtnProps> = useAttrs();
	const slots: Partial<QBtn> = useSlots();
</script>

<style lang="scss" scoped>
	.baseButton {
		font-weight: 700;
		font-size: 0.9rem;
		line-height: 1;
	}
</style>
