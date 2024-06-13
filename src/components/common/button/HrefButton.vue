<template>
	<BaseButton
		:="attrs"
		:href="href"
		:target="target"
		push
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QBtn, QBtnProps } from 'quasar';

	const props = withDefaults(
		defineProps<{
			href: string;
			target?: string;
		}>(),
		{
			target: '_blank',
		}
	);

	const attrs: Partial<QBtnProps> = useAttrs();
	const slots: Partial<QBtn> = useSlots();
</script>

<style lang="scss" scoped></style>
