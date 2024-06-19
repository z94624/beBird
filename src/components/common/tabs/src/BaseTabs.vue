<template>
	<q-tabs :="getBindingValues">
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-tabs>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QTabs, QTabsProps } from 'quasar';

	const props = withDefaults(
		defineProps<{
			activeColor?: string;
			activeBgColor?: string;
		}>(),
		{
			activeColor: 'primary',
			activeBgColor: 'secondary',
		}
	);

	const attrs: Partial<QTabsProps> = useAttrs();
	const slots: Partial<QTabs> = useSlots();

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,
		};
	});
</script>

<style lang="scss" scoped></style>
